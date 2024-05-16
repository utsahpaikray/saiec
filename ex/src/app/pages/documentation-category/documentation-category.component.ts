import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { BlobItem, Category, Scalars } from '@core/generated/types'
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { ApolloQueryResult } from '@apollo/client/core'
import { TranslocoService } from '@ngneat/transloco'

import { DocumentTableItem } from '../documentation/document-table/document-table-item.interface'
import {
  DocumentCategoryGQL,
  DocumentCategoryQuery
} from './graphql/document-category.graphql-gen'
import {
  DocumentsForCategoryGQL,
  DocumentsForCategoryQuery
} from './graphql/documents-for-category.graphql-gen'
import {
  DocumentUrlGQL,
  DocumentUrlQuery
} from './graphql/document-url.graphql-gen'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'

@Component({
  selector: 'app-documentation-category',
  templateUrl: './documentation-category.component.html'
})
export class DocumentationCategoryComponent implements OnInit {
  public category?: Category
  public loading: boolean
  public categoryName: string
  public siteId: Scalars['UUID']
  public documents: DocumentTableItem[]
  public searchText: string
  public searchResults: DocumentTableItem[] = []
  public documentsBySite: any[]
  public availableCultures: string[]
  public selectedCulture?: string
  public fullOmManuals: BlobItem[]

  private localStorageKey = 'MVI-document-category-culture'

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentCategoryGQL: DocumentCategoryGQL,
    private documentsForCategoryGQL: DocumentsForCategoryGQL,
    private documentUrlGQL: DocumentUrlGQL,
    private toastService: ToasterService,
    private translocoService: TranslocoService
  ) {}

  /**
   * On init get document categories
   */
  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params: Params) => (this.siteId = params.siteId)),
        switchMap((params: Params) =>
          this.getDocumentCategories(params.categoryCodeName, params.siteId)
        )
      )
      .subscribe({
        next: ({ data, loading }) => {
          this.category = data?.categories[0] as Category
          this.documentsBySite = data?.documentsBySite
          this.loading = loading
          if (this.category) {
            this.setCategoryName(this.category)
            this.setCategoryDocuments(this.category)
          }
        },
        error: () => (this.documents = [])
      })
  }

  /**
   * Set search text from search input
   * @param {string} searchValue
   * @returns {DocumentSearchResult}
   */
  public search(searchValue: string): void {
    this.searchText = searchValue
  }

  /**
   * Set and persist selected culture to local storage
   * Filter documents on new culture
   * @param {string} culture
   */
  public onCultureChange(culture: string) {
    this.selectedCulture = culture
    localStorage.setItem(this.localStorageKey, this.selectedCulture)
    this.documents = this.parseDocumentStructure()
  }

  /**
   * Download complete O&M Manual
   */
  public downloadOmManual(): void {
    const manualToDownload = this.fullOmManuals.find(
      (manual) => manual.culture === this.selectedCulture
    )
    if (!manualToDownload?.name) {
      return
    }
    this.documentUrlGQL
      .fetch(
        {
          name: manualToDownload.name,
          siteId: this.siteId
        },
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        map(
          (result: ApolloQueryResult<DocumentUrlQuery>) =>
            result.data?.documentUrl || null
        )
      )
      .subscribe({
        next: this.downloadFile.bind(this),
        error: () => {
          const error = new Toast(
            'error',
            this.translocoService.translate('General.ApiError')
          )
          this.toastService.addToast(error)
        }
      })
  }

  /**
   * Clear search text
   */
  public clearSearchText(): void {
    if (this.searchText) {
      this.searchText = ''
    }
  }

  /**
   * Download file from url
   * @param {string} url
   */
  private downloadFile(url: string): void {
    const link = document.createElement('a')
    link.setAttribute('type', 'hidden')
    link.href = url
    link.download = url
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  /**
   * Run query for document categories
   * This query cannot be refetched after zip file is uploaded via azureBlobStorage, thus, cache is not used.
   * @returns { Observable<ApolloQueryResult<DocumentCategoryQuery>>}
   */
  private getDocumentCategories(
    categoryCodeName: string,
    siteId: string
  ): Observable<ApolloQueryResult<DocumentCategoryQuery>> {
    return this.documentCategoryGQL.watch(
      {
        categoryCodeName,
        siteId
      },
      { useInitialLoading: true, fetchPolicy: 'no-cache' }
    ).valueChanges
  }

  /**
   * Set documents per category
   * If it's O&M we need to retrieve Full O&M for download and language switch
   */
  public setCategoryDocuments(category: Category): void {
    if (category.codeName === 'OM') {
      this.setOmCategory('FULLOM')
      return
    }
    this.selectedCulture = this.getSelectedCulture()
    this.documents = this.parseDocumentStructure()
  }

  /**
   * Set OM parameters
   * @param {string} categoryCodeName
   */
  private setOmCategory(categoryCodeName: string): void {
    this.availableCultures = this.documentsBySite
      .map((manual) => manual.culture)
      .filter((value, index, self) => {
        return self.indexOf(value) === index
      })

    this.documentsForCategoryGQL
      .fetch({
        categoryCodeName,
        siteId: this.siteId
      })
      .pipe(
        map(
          (result: ApolloQueryResult<DocumentsForCategoryQuery>) =>
            result.data.documentsBySite as BlobItem[]
        )
      )
      .subscribe({
        next: (documentsBySite: BlobItem[]) => {
          this.fullOmManuals = documentsBySite
          this.selectedCulture = this.getSelectedCulture()
          this.documents = this.parseDocumentStructure()
        }
      })
  }

  /**
   * Create document structure from flat item list
   * @returns {DocumentTableItem}
   */
  public parseDocumentStructure(): DocumentTableItem[] {
    const filteredDocuments = this.filterDocuments(
      this.documentsBySite,
      this.selectedCulture
    )
    const groupedDocuments: DocumentTableItem[] = []
    filteredDocuments.forEach((document) => {
      const fullDocumentName = document.name || ''
      const unprefixedDocumentName = this.removeAttachmentPrefix(
        fullDocumentName,
        this.category?.codeName || ''
      )
      const folderPathParts = unprefixedDocumentName.split('/') || []

      if (folderPathParts.length === 0) {
        return
      }

      this.addDocumentToFolder(
        groupedDocuments,
        folderPathParts,
        document,
        0,
        fullDocumentName
      )
    })

    return groupedDocuments
  }

  /**
   * Add document to a folder
   * @param {DocumentTableItem} folderToAddTo
   * @param {string[]} folderPathParts
   * @param {BlobItem} document
   */
  private addDocumentToFolder(
    folderToAddTo: DocumentTableItem[],
    folderPathParts: string[],
    document: BlobItem,
    depth: number,
    fullDocumentName: string
  ): void {
    // No sublevels. This is a document. Add it to the folder directly
    if (folderPathParts.length === 1) {
      folderToAddTo.push({
        contentLength: document.contentLength,
        name: folderPathParts.join('/'),
        depth,
        fullName: fullDocumentName
      })
      return
    }

    // Sub levels present. Get correct folder name and add it to children
    const folderName = folderPathParts.shift() || ''
    const nestedFolderToAddTo = this.getFolderByName(
      folderToAddTo,
      folderName,
      depth
    )

    this.addDocumentToFolder(
      nestedFolderToAddTo.children || [],
      folderPathParts,
      document,
      depth + 1,
      fullDocumentName
    )
  }

  /**
   * Get the folder by it's name.
   * Search all folders in the parent folder and create a new folder if it does not exist yet
   * @param {DocumentTableItem} parentFolder
   * @param {string} folderName
   * @returns {DocumentTableItem}
   */
  private getFolderByName(
    parentFolder: DocumentTableItem[],
    folderName: string,
    depth: number
  ): DocumentTableItem {
    const folder = parentFolder.find(
      (subFolder: any) => subFolder.name === folderName
    )

    if (folder === undefined) {
      const newFolder = {
        name: folderName,
        children: [],
        depth
      }

      parentFolder.push(newFolder)
      return newFolder
    }
    return folder
  }

  /**
   * Filter documents. Remove everything with wrong locale, and remove prefix from document name
   * @param {BlobItem[]} documents
   * @returns {BlobItem[]}
   */
  private filterDocuments(documents: BlobItem[], locale?: string): BlobItem[] {
    if (!locale) {
      return documents
    }
    return documents.filter((document) => document.culture === locale)
  }

  /**
   * Remove prefix from document name
   * @param {string} documentName
   * @param {string} codeName
   * @returns {string}
   */
  private removeAttachmentPrefix(
    documentName: string,
    codeName: string
  ): string {
    const folderParts = documentName.split('/') || []
    folderParts.splice(0, folderParts.indexOf(codeName) + 2)
    return folderParts.join('/')
  }

  /**
   * Set category name from category cultures
   * @param {Category} category
   */
  private setCategoryName(category: Category): void {
    if (!category) {
      this.categoryName = ''
    }
    const currentCategoryCulture = category.categoryCultures.find(
      (categoryCulture) =>
        categoryCulture.culture === this.translocoService.getActiveLang()
    )
    this.categoryName = currentCategoryCulture?.name || ''
  }

  /**
   * Get correct document locale.
   * If no available cultures no selected culture is set
   * If has available cultures document locale is dependent on selected language
   * @returns {string | undefined}
   */
  private getSelectedCulture(): string | undefined {
    if (!this.availableCultures || this.availableCultures.length === 0) {
      return undefined
    }

    const persistedSelectedCulture = localStorage.getItem(this.localStorageKey)

    if (
      persistedSelectedCulture &&
      this.availableCultures.indexOf(persistedSelectedCulture) > -1
    ) {
      return persistedSelectedCulture
    }

    return this.availableCultures[0] || ''
  }
}
