import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { CardModule } from '@components/card/card.module'
import { ModalModule } from '@components/modal/modal.module'
import { ModalService } from '@components/modal/modal.service'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { DocumentInput } from '@core/generated/types'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import ticketingConfig from '@core/ticketing/config'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { TranslocoService } from '@ngneat/transloco'
import { Observable } from 'rxjs'
import { breakpointLgMin } from 'src/tokens/build/js/es6'
import { AddAttachmentForm } from './add-attachment-form.interface'

@Component({
  selector: 'app-add-attachment-modal',
  templateUrl: './add-attachment-modal.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ModalModule,
    TranslocoRootModule,
    ReactiveFormsModule,
    CardModule,
    ProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddAttachmentModalComponent {
  @ViewChild('uploadAttachment') uploadRef: ElementRef
  public fileToUpload: File
  public acceptedFilesType =
    ticketingConfig.attachments.allowedExtensions.toString()
  public descriptionMaxCount = 254
  public showFileAlert = false
  public modalId = 'add-attachment'

  @Input() public uploadingAttachment = false

  @Input() public openModalButtonText: string

  @Input() public submitButtonText: string

  @Output()
  addDocumentEvent = new EventEmitter<DocumentInput>()

  private modalService = inject(ModalService)
  private formBuilder = inject(FormBuilder)
  private toastService = inject(ToasterService)
  private translocoService = inject(TranslocoService)
  private windowResizeService = inject(WindowResizeService)

  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public viewports = Viewports

  public form: AddAttachmentForm = this.formBuilder.nonNullable.group({
    description: ['', { validators: [Validators.required] }]
  })

  /**
   * Validate file type/size and open the modal
   */
  public uploadFile(event: any): void {
    if (event.target.files[0]) {
      this.fileToUpload = event.target.files[0] as File

      // show not allowed file type error
      if (!this.isFileTypeAllowed()) {
        this.showErrorToast(
          this.translocoService.translate('General.FileTypeWarning') +
            ' ' +
            this.fileToUpload.name.split('.').pop()?.toLocaleLowerCase()
        )

        return
      }

      // verify max file size
      if (!this.isFileSizeAllowed()) {
        this.showErrorToast(
          this.translocoService.translate('Attachments.FileSizeError')
        )
        return
      }
      this.modalService.open(this.modalId)
    }
  }

  /**
   * Verify if the file type is allowed
   * @returns {boolean}
   */
  private isFileTypeAllowed(): boolean {
    const fileType = this.fileToUpload.name
      .split('.')
      .pop()
      ?.toLocaleLowerCase()

    if (!fileType) return false
    return this.acceptedFilesType.includes(fileType)
  }

  /**
   * Verify if the file size is allowed
   * @returns {boolean}
   */
  private isFileSizeAllowed(): boolean {
    const maxAllowedSize = 10 * 1024 * 1024
    return this.fileToUpload.size < maxAllowedSize
  }
  /**
   * Convert file to base64 string
   * @param {File} file
   * @returns {Promise<string>}
   */
  public convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => {
        reject(error)
        this.showErrorToast(this.translocoService.translate('General.ApiError'))
      }
    })
  }

  /**
   * Close modal by clicking cancel button
   */
  public closeModal(onCloseEvent = false): void {
    if (!onCloseEvent) this.modalService.close(this.modalId)
    this.uploadRef.nativeElement.value = ''
    this.form.reset()
  }

  /**
   * On button click trigger input click to initiate upload
   */
  public addAttachment(): void {
    this.uploadRef.nativeElement.click()
  }

  /**
   * Validate form, Add document to ticket handler and close modal
   */
  public onSubmit(): void {
    this.form.markAllAsTouched()
    if (!this.form.valid) return

    this.convertFileToBase64(this.fileToUpload).then((filePath) => {
      const document = {
        description: this.form.value.description,
        documentData: filePath.split(',').pop(),
        documentName: this.fileToUpload.name
      } as DocumentInput

      this.addDocumentEvent.emit(document)
    })
  }

  private showErrorToast(message: string): void {
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(input: AbstractControl): boolean {
    return input.invalid && input.touched
  }

  /**
   * Get description form control
   * @returns {FormControl<string>}
   */
  public get description(): FormControl<string> {
    return this.form.controls.description as FormControl<string>
  }
}
