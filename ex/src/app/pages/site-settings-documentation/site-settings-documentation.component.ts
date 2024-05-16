import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { combineLatest, forkJoin, Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { ApolloQueryResult } from '@apollo/client/core'
import { TranslocoService } from '@ngneat/transloco'

import { BlobItem, Category, Scalars } from '@core/generated/types'
import {
  AllowedDocumentationCulturesGQL,
  AllowedDocumentationCulturesQuery,
  DocumentCultureFragment
} from '@core/documentation/graphql/allowed-documentation-cultures.graphql-gen'
import {
  DocumentationSettingsCategoriesGQL,
  DocumentationSettingsCategoriesQuery
} from './graphql/categories.graphql-gen'
import {
  DocumentationSettingsDocumentsPerCategoryGQL,
  DocumentationSettingsDocumentsPerCategoryQuery
} from './graphql/documents-per-category.graphql-gen'
import { DocumentationSettingsDeleteDocumentGQL } from './graphql/mutation/deleteDocument.graphql-gen'

import { UploadCategory } from './upload-documents-modal/upload-category.interface'
import { ModalService } from '@components/modal/modal.service'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import {
  DocumentationTableCategory,
  DocumentationTableDocumentDelete,
  DocumentationTableDocumentDeleteEvent
} from './documentation-table.model'

@Component({
  selector: 'app-site-settings-documentation',
  templateUrl: './site-settings-documentation.component.html',
  styleUrls: ['./site-settings-documentation.component.scss']
})
export class SiteSettingsDocumentationComponent implements OnInit {
  public siteId: Scalars['UUID']
  public tableCategories: DocumentationTableCategory[]
  public categories: Category[]
  public uploadCategories: UploadCategory[]
  public isOpen: boolean = false
  public documentToDelete: DocumentationTableDocumentDelete

  private allowedCultures: DocumentCultureFragment[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private allowedDocumentationCulturesGQL: AllowedDocumentationCulturesGQL,
    private documentationSettingsCategoriesGQL: DocumentationSettingsCategoriesGQL,
    private documentationSettingsDeleteDocumentGQL: DocumentationSettingsDeleteDocumentGQL,
    private documentationSettingsDocumentsPerCategoryGQL: DocumentationSettingsDocumentsPerCategoryGQL,
    private translocoService: TranslocoService,
    private modalService: ModalService,
    private toastService: ToasterService
  ) {}

  public ngOnInit() {
    this.activatedRoute.params
      .pipe(
        tap((params: Params) => (this.siteId = params.siteId)),
        switchMap(() => {
          return combineLatest([
            this.getCategories(this.translocoService.getActiveLang()),
            this.fetchAllowedCultures()
          ])
        })
      )
      .subscribe({
        next: ([categories, allowedCultures]: [
          Category[],
          DocumentCultureFragment[]
        ]) => {
          this.categories = categories
          this.allowedCultures = allowedCultures

          this.uploadCategories = categories.map((category: Category) => {
            return {
              id: category.codeName,
              name: category?.categoryCultures[0]?.name || ''
            }
          })
          this.fetchDocumentsByCategory(this.categories)
        },
        error: () => (this.categories = [])
      })
  }

  /**
   * Set document to delete & open confirmation modal
   * @param {number} categoryIndex
   * @param {number} document
   */
  public onDocumentDelete(
    categoryIndex: number,
    document: DocumentationTableDocumentDeleteEvent
  ): void {
    this.documentToDelete = {
      categoryIndex,
      ...document
    }
    this.modalService.open('delete-document-confirmation-modal')
  }

  /**
   * Run query for categories
   * @returns {Observable<Category[]>}
   */
  private getCategories(culture: string): Observable<Category[]> {
    return this.documentationSettingsCategoriesGQL
      .fetch({ culture })
      .pipe(
        map(
          (result: ApolloQueryResult<DocumentationSettingsCategoriesQuery>) =>
            result.data.categories as Category[]
        )
      )
  }

  /**
   * Fetch documents by category parameters
   * @param {Category[]} categories
   */
  public fetchDocumentsByCategory(categories: Category[]): void {
    const documentsPerCategory = categories.map((category) => {
      return this.documentationSettingsDocumentsPerCategoryGQL
        .fetch(
          {
            categoryCodeName:
              category.codeName === 'OM' ? 'FULLOM' : category.codeName,
            siteId: this.siteId
          },
          {
            fetchPolicy: 'no-cache'
          }
        )
        .pipe(
          map(
            (
              result: ApolloQueryResult<DocumentationSettingsDocumentsPerCategoryQuery>
            ) => result.data.documentsBySite as BlobItem[]
          )
        )
    })

    forkJoin(documentsPerCategory).subscribe({
      next: (documentsBySite: BlobItem[][]) => {
        this.setDocumentsByCategory(
          categories,
          documentsBySite,
          this.allowedCultures
        )
      },
      error: () => (this.tableCategories = [])
    })
  }

  /**
   * Set documents by category parameters
   * @param {Category[]} categories
   * @param {BlobItem[][]} documentsBySite
   * @param {DocumentCultureFragment[]} allowedCultures
   */
  private setDocumentsByCategory(
    categories: Category[],
    documentsBySite: BlobItem[][],
    allowedCultures: DocumentCultureFragment[]
  ): void {
    this.tableCategories = categories.map((category: Category) => {
      const categoryDocuments = documentsBySite.reduce(
        (previousValue: BlobItem[], currentValue: BlobItem[]) => {
          const filteredDocuments = currentValue.filter((document) => {
            if (category.codeName === 'OM') {
              return document.categoryCodeName === 'FULLOM'
            }
            return document.categoryCodeName === category.codeName
          })

          return [...previousValue, ...filteredDocuments]
        },
        []
      )

      return {
        isOpen: false,
        name: category?.categoryCultures[0]?.name || '',
        documentsAmount: categoryDocuments.length,
        documents: categoryDocuments.map((document: BlobItem) => {
          const localeLabel = allowedCultures.find(
            (locale) => locale.name === document.culture
          )
          return {
            name: document.name || '',
            contentLength: document.contentLength || 0,
            culture: localeLabel?.englishName,
            isDeleting: false,
            // Needed as a flag for the animation classes
            deleted: false
          }
        })
      }
    })
  }

  /**
   * Confirmation modal of delete document.
   * If confirmed, delete document from its' name, otherwise just set document's isDeleting property to false
   * @param {boolean} confirmed
   */
  public onConfirmationClose(confirmed: boolean): void {
    if (confirmed) {
      this.deleteDocumentRequest()
    } else {
      this.setDocumentIsDeletingProperty(false)
    }
  }

  /**
   * Trigger delete document mutation
   */
  private deleteDocumentRequest(): void {
    this.documentationSettingsDeleteDocumentGQL
      .mutate({
        documentName: this.documentToDelete.name,
        siteId: this.siteId
      })
      .subscribe({
        next: ({ data, loading }) => {
          this.setDocumentIsDeletingProperty(loading)

          if (data?.deleteDocument)
            this.deleteDocument(this.documentToDelete.index)
        },
        error: () => {
          this.showErrorToast()
        }
      })
  }

  /**
   * Delete document
   * @param {number} index
   */
  private deleteDocument(index: number): void {
    this.tableCategories[
      this.documentToDelete.categoryIndex
    ].documentsAmount -= 1
    this.tableCategories[this.documentToDelete.categoryIndex].isOpen =
      this.tableCategories[this.documentToDelete.categoryIndex]
        .documentsAmount > 0
    this.tableCategories[this.documentToDelete.categoryIndex].documents![
      index
    ].deleted = true

    // Wait for document animation to be done and only after remove it from the documents' array
    setTimeout(() => {
      this.tableCategories[
        this.documentToDelete.categoryIndex
      ].documents?.splice(index, 1)
    }, 300)

    this.showSuccessToast()
  }

  /**
   * Sets the document's isDeleting property to true or false
   * @param {boolean} isDeleting
   */
  private setDocumentIsDeletingProperty(isDeleting: boolean): void {
    if (this.documentToDelete) {
      this.tableCategories[this.documentToDelete.categoryIndex].documents![
        this.documentToDelete.index
      ].isDeleting = isDeleting
    }
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
   * Show success toast
   */
  private showSuccessToast(): void {
    const message = this.translocoService.translate(
      'SiteAdminDocumentation.DeleteFileSuccess'
    )
    const success = new Toast('success', message)
    this.toastService.addToast(success)
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
