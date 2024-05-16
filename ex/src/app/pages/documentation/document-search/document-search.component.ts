import { Component, Input, OnChanges } from '@angular/core'
import { Observable } from 'rxjs'

import { TranslocoService } from '@ngneat/transloco'
import { DocumentSearchResultItem, Scalars } from '@core/generated/types'
import {
  DocumentSearchGQL,
  DocumentSearchQuery
} from './graphql/document-search.graphql-gen'
import { DocumentDownloadService } from '@core/document-download/document-download.service'
import { DocumentSearchResultTableItem } from './document-search-result-table-item.interface'
import { ApolloQueryResult } from '@apollo/client/core'

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html'
})
export class DocumentSearchComponent implements OnChanges {
  @Input() searchText: string
  @Input() categoryCodeName: Scalars['UUID']
  @Input() siteId: Scalars['UUID']

  public loading: boolean
  public documents: DocumentSearchResultTableItem[]

  constructor(
    private documentSearchGQL: DocumentSearchGQL,
    private translocoService: TranslocoService,
    private documentDownloadService: DocumentDownloadService
  ) {}

  /**
   * On change search if searchtext is longer then 2 chars
   */
  public ngOnChanges(): void {
    this.search()
  }

  /**
   * Get search results per search text
   * @returns {DocumentSearchResult}
   */
  public search(): void {
    this.getDocumentSearchResults(this.searchText).subscribe({
      next: ({ data, loading }) => {
        data &&
          this.formatResultAsDocumentCategoryItem(
            data.documentSearch.result as DocumentSearchResultItem[]
          )
        this.loading = loading
      },
      error: () => (this.documents = [])
    })
  }

  /**
   * Download document
   * @param {DocumentSearchResultTableItem} document
   */
  public download(document: DocumentSearchResultTableItem): void {
    if (document.fullName) {
      this.documentDownloadService.download(document.fullName, this.siteId)
    }
  }

  /**
   * Run query for document search
   * @param {string} searchString
   * @returns {Observable<ApolloQueryResult<DocumentSearchQuery>>}
   */
  private getDocumentSearchResults(
    searchString: string
  ): Observable<ApolloQueryResult<DocumentSearchQuery>> {
    return this.documentSearchGQL.watch(
      {
        searchString,
        siteId: this.siteId,
        userCulture: this.translocoService.getActiveLang(),
        filters: []
      },
      { useInitialLoading: true, fetchPolicy: 'cache-and-network' }
    ).valueChanges
  }

  /**
   * Format search results as document category item
   * @param {DocumentSearchResult[]}
   * @returns {DocumentTableItem[]}
   */
  private formatResultAsDocumentCategoryItem(
    results: DocumentSearchResultItem[]
  ) {
    if (!results.length) {
      this.documents = []
      return
    }
    this.documents = results.map((item: DocumentSearchResultItem) => {
      return {
        contentLength: item.metadata_storage_size,
        name: item.metadata_storage_name,
        fullName: item.storage_path,
        location: item.location,
        highlightText: this.parseStringToInnerHTML(item.metadata_storage_name),
        content: this.generateDocumentContent(item.contentHighlights)
      }
    })
  }

  /**
   * Generate document content
   * @param {string[]} contentHighlights
   * @returns {string}
   */
  private generateDocumentContent(contentHighlights: string[]): string {
    if (!contentHighlights || !contentHighlights[0]) {
      return ''
    }
    return `...${this.parseStringToInnerHTML(contentHighlights[0])}...`
  }

  /**
   * Check if <mark> element exist in document name
   * @param {string} name
   * @return {boolean}
   */
  private hasMarkHtmlElement(name: string): Boolean {
    return name.includes('<mark>')
  }

  /**
   * parse document name to html element
   * and add a class and set its innerHTML as highlight text
   * @param {string} name
   * @returns {string}
   */
  private parseStringToInnerHTML(name: string): string {
    if (this.hasMarkHtmlElement(name)) {
      let parser = new DOMParser()
      const doc = parser.parseFromString(name, 'text/html')
      doc.querySelectorAll('mark').forEach((x) => {
        x.classList.add('font-bold')
        x.classList.add('bg-transparent')
      })

      return doc.body.innerHTML
    }

    return name
  }
}
