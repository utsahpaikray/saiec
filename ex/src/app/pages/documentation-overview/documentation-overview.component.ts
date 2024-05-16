import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ActivatedRoute, Params } from '@angular/router'
import { TranslocoService } from '@ngneat/transloco'
import { ApolloQueryResult } from '@apollo/client/core'
import { Category, Scalars } from '@core/generated/types'
import {
  DocumentCategoriesGQL,
  DocumentCategoriesQuery
} from './graphql/document-categories.graphql-gen'

@Component({
  selector: 'app-documentation-overview',
  templateUrl: './documentation-overview.component.html'
})
export class DocumentationOverviewComponent implements OnInit, OnDestroy {
  public categories: Category[]
  public loading: boolean
  public searchText: string
  public siteId: Scalars['UUID']

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private activatedRoute: ActivatedRoute,
    private documentCategoriesGQL: DocumentCategoriesGQL,
    private translocoService: TranslocoService
  ) {}

  /**
   * On init get document categories
   */
  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => (this.siteId = params['siteId'])
    )

    this.getDocumentCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data, loading }) => {
          this.categories = data?.categories.filter(
            (category) => data?.categoriesBySite.indexOf(category.codeName) > -1
          ) as Category[]
          this.loading = loading
        },
        error: () => (this.categories = [])
      })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Run query for document categories
   * This query cannot be refetched after zip file is uploaded via azureBlobStorage, thus, cache is not used.
   * @returns {Observable<ApolloQueryResult<DocumentCategoriesQuery>>}
   */
  private getDocumentCategories(): Observable<
    ApolloQueryResult<DocumentCategoriesQuery>
  > {
    return this.documentCategoriesGQL.watch(
      {
        culture: this.translocoService.getActiveLang(),
        siteId: this.siteId
      },
      { useInitialLoading: true, fetchPolicy: 'no-cache' }
    ).valueChanges
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
   * Clear search text
   */
  public clearSearchText(): void {
    if (this.searchText) {
      this.searchText = ''
    }
  }
}
