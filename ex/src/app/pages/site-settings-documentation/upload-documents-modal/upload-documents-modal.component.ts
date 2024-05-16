import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  inject
} from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { FormBuilder, Validators } from '@angular/forms'
import { ApolloQueryResult } from '@apollo/client/core'
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  throwError
} from 'rxjs'

import { DropdownItem } from '@components/dropdown/dropdown-item.model'
import { Scalars } from '@core/generated/types'
import { AzureBlobStorageService } from '@core/azure/azure-blob-storage.service'
import { ModalService } from '@components/modal/modal.service'
import { ToasterService } from '@components/toaster/toaster.service'
import { Toast } from '@components/toaster/toast/toast.model'
import { UploadCategory } from './upload-category.interface'

import { Alert } from '@components/alert/alert.model'
import {
  AllowedDocumentationCulturesGQL,
  AllowedDocumentationCulturesQuery,
  DocumentCultureFragment
} from '@core/documentation/graphql/allowed-documentation-cultures.graphql-gen'
import { UploadDocumentsForm } from './upload-documents-form.interface'
import documentationConfig, { ZIP_FILE_TYPE } from '@core/documentation/config'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: 'app-upload-documents-modal',
  templateUrl: './upload-documents-modal.component.html'
})
export class UploadDocumentsModalComponent implements OnChanges, OnDestroy {
  @Input() categories: UploadCategory[]
  @Input() siteId: Scalars['UUID']
  @Output() fileUploaded: EventEmitter<void> = new EventEmitter<void>()

  private formBuilder = inject(FormBuilder)
  private modalService = inject(ModalService)
  private toastService = inject(ToasterService)
  private translocoService = inject(TranslocoService)
  private blobStorageService = inject(AzureBlobStorageService)
  private allowedDocumentationCulturesGQL = inject(
    AllowedDocumentationCulturesGQL
  )

  public showFileAlert = false
  public alertMessage = ''
  public categoryDropDownItems: DropdownItem[]
  public localeDropdownItems: DropdownItem[] = []
  public form: UploadDocumentsForm | null
  public modalId = 'upload-documents'
  public zipFilesSelected = false
  public zipFilesAlert: Alert = new Alert(
    'information',
    this.translocoService.translate('SiteAdminDocumentation.ZipFileSelected'),
    'https://www.7-zip.org/',
    this.translocoService.translate('SiteAdminDocumentation.Download7Zip')
  )
  public acceptedFilesType: string =
    documentationConfig.allowedExtensions.toString()

  private filesToUpload: File[]
  private filesBeingUploaded = 0
  private uploadEndRef: Subscription

  private zipMimeTypes = [
    'application/x-rar-compressed',
    'application/octet-stream',
    'application/zip',
    'application/octet-stream',
    'application/x-zip-compressed',
    'multipart/x-zip'
  ]

  private readonly CATEGORY_OM = 'OM'

  /**
   * On change set categories dropdown items
   */
  public ngOnChanges(): void {
    if (!this.categories) {
      this.categories = []
      return
    }
    this.categoryDropDownItems = this.categories.map(
      (category) => new DropdownItem(category.id, category.name)
    )
  }

  /**
   * Clean up subscription on component destroy
   */
  public ngOnDestroy(): void {
    if (this.uploadEndRef) {
      this.uploadEndRef.unsubscribe()
    }
  }

  /**
   * watch value change of category to set accepted file type
   */
  private onCategoryChange(): void {
    this.form
      ?.get('category')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((val) => {
        if (val === this.CATEGORY_OM) {
          this.acceptedFilesType = ZIP_FILE_TYPE
          return
        }
        this.acceptedFilesType =
          documentationConfig.allowedExtensions.toString()
      })
  }

  /**
   * Open upload modal
   */
  public openUploadModal(): void {
    this.initializeForm()
    this.setLocaleDropdown()
    this.modalService.open(this.modalId)
    this.onCategoryChange()
  }

  /**
   * Closes modal if it's not on the modal's close event and resets its' data after animation
   * @param {boolean} onCloseEvent
   */
  public closeModal(onCloseEvent: boolean = false): void {
    if (!onCloseEvent) this.modalService.close(this.modalId)

    setTimeout(() => {
      this.filesToUpload = []
      this.showFileAlert = false
      this.alertMessage = ''
      this.zipFilesSelected = false
      this.form = null
    }, 300)
  }

  /**
   * Validate form and upload documents
   */
  public onSubmit(): void {
    this.form?.markAllAsTouched()

    switch (true) {
      case !this.filesToUpload || this.filesToUpload.length === 0:
        this.showFileAlert = true
        this.alertMessage = this.translocoService.translate(
          'SiteAdminDocumentation.SelectFiles'
        )
        break

      case this.notSupportedFileTypes().length > 0:
        this.showFileAlert = true
        this.alertMessage =
          this.translocoService.translate('General.FileTypeWarning') +
          ' ' +
          this.notSupportedFileTypes()
        break

      case !this.form?.valid:
        break

      default:
        this.uploadFilesToBlobStorage()
        break
    }
  }

  /**
   * Verify if all files types are allowed
   * @returns {string[]}
   */
  private notSupportedFileTypes(): string[] {
    return this.filesToUpload?.reduce((acc: string[], file) => {
      const fileType = file.name.split('.').pop()?.toLocaleLowerCase()
      if (
        fileType &&
        !acc.includes(fileType) &&
        !this.acceptedFilesType.includes(fileType)
      ) {
        return [...acc, fileType]
      }

      return acc
    }, [])
  }

  /**
   * Save files to upload to property
   * @param {File[]} files
   */
  public onUploadFiles(files: File[]): void {
    this.showFileAlert = false
    this.alertMessage = ''
    this.zipFilesSelected = files.some(
      (file) => this.zipMimeTypes.indexOf(file.type) > -1
    )
    this.filesToUpload = files
  }

  /**
   * Set active language for dropdown
   */
  private setLocaleDropdown(): void {
    this.fetchAllowedCultures()
      .pipe(take(1))
      .subscribe({
        next: (locales: DocumentCultureFragment[]) => {
          this.localeDropdownItems = locales.map(
            (locale: DocumentCultureFragment) =>
              new DropdownItem(locale.name, locale.englishName)
          )

          const localeIds = locales.map((locale) => locale.name)
          if (localeIds.indexOf(this.translocoService.getActiveLang()) > -1) {
            this.form
              ?.get('language')
              ?.setValue(this.translocoService.getActiveLang())
          }
        }
      })
  }

  /**
   * Fetch all allowed cultures for upload from API
   */
  private fetchAllowedCultures(): Observable<DocumentCultureFragment[]> {
    return this.allowedDocumentationCulturesGQL
      .fetch()
      .pipe(
        map(
          (result: ApolloQueryResult<AllowedDocumentationCulturesQuery>) =>
            result.data.allowedDocumentationCultures
        )
      )
  }

  /**
   * Initiialize upload form
   */
  private initializeForm(): void {
    this.form = this.formBuilder.nonNullable.group({
      category: ['', [Validators.required]],
      language: ['', [Validators.required]]
    }) as UploadDocumentsForm
  }

  /**
   * Upload files
   */
  private uploadFilesToBlobStorage(): void {
    const categoryValue = this.form?.value.category as string
    const categoryName =
      this.categories.find((category) => category.id === categoryValue)?.name ||
      ''
    const language = this.form?.value.language as string
    this.filesBeingUploaded = this.filesToUpload.length
    this.filesToUpload.forEach((file: File) =>
      this.uploadFile(file, this.siteId, categoryValue, categoryName, language)
    )
    this.closeModal()
  }

  /**
   * Upload file
   */
  private uploadFile(
    file: File,
    siteId: string,
    categoryCodeName: string,
    categoryName: string,
    culture: string
  ) {
    this.blobStorageService
      .getUploadInfo(file, siteId, categoryCodeName, culture)
      .pipe(
        switchMap((uploadInfo) =>
          this.blobStorageService.upload(
            uploadInfo,
            file,
            categoryName,
            siteId,
            categoryCodeName,
            culture
          )
        ),
        catchError((error) => {
          if (error?.name === 'AbortError') {
            this.toastService.addToast(
              new Toast(
                'success',
                this.translocoService.translate(
                  'SiteAdminDocumentation.CancelUploadSuccess'
                )
              )
            )

            return of(null)
          }

          this.showErrorToast()
          return throwError(() => error)
        }),
        take(1)
      )
      .subscribe({
        next: () => {
          this.filesBeingUploaded--

          if (this.filesBeingUploaded === 0) {
            // for PDF files, refresh documenation table once they are uploaded
            this.fileUploaded.emit()

            // for zip files, after uploaded, wait for zip process is done to refresh documentation table
            if (this.uploadEndRef) {
              this.uploadEndRef.unsubscribe()
            }

            this.uploadEndRef = this.blobStorageService.uploadEnd$.subscribe(
              () => {
                this.fileUploaded.emit()
              }
            )
          }
        }
      })
  }

  /**
   * Show error toast
   */
  private showErrorToast(): void {
    const message = this.translocoService.translate('General.ApiError')
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }
}
