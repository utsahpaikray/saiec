import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { LoadMorePaginatorComponent } from '@components/load-more-paginator/load-more-paginator.component'
import { LoadMoreComponent } from '@components/load-more/load-more.component'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { DIALOG_DATA, DIALOG_REF } from '@core/dialog/dialog.service'
import { Asset, Scalars } from '@core/generated/types'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TicketsService } from '@core/tickets/tickets.service'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  withLatestFrom
} from 'rxjs'

export interface SelectAssetDialogVM {
  siteId$: Observable<Scalars['UUID']>
}

interface AssetSearch {
  assets?: Asset[]
  loadMoreLoading?: boolean
  totalCounts?: number
  hasMoreAssets?: boolean
  hasAssets?: boolean
  initialLoading?: boolean
  headers?: string[]
}

const ASSET = 'Asset'

// To get the initial list of graphql queries, we need two queries to perform the operational task,
// The first one is the loading state query for asset list, and the second one is the data.
// INITIAL_ASSET_LIST_GRAPHQL_QUERIES = loading query + data query
const INITIAL_ASSET_LIST_GRAPHQL_QUERIES: number = 2

@Component({
  selector: 'app-select-asset-dialog',
  templateUrl: './select-asset-dialog.component.html',
  styleUrls: ['./select-asset-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslocoRootModule,
    ProgressSpinnerModule,
    LoadMoreComponent,
    ReactiveFormsModule,
    LoadMorePaginatorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectAssetDialogComponent {
  public searchText: FormControl<string> = new FormControl()
  private skipSubject$ = new Subject<number>()
  private readonly windowResizeService = inject(WindowResizeService)
  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public readonly viewports = Viewports

  private ticketsService = inject(TicketsService)
  public readonly dialogRef = inject(DIALOG_REF)
  public readonly dialogData: SelectAssetDialogVM = inject(DIALOG_DATA)
  public readonly tableHeaders: string[] = [
    'Description',
    'MarkCode',
    'MarkNumber'
  ]

  private queryParams$ = combineLatest([
    this.dialogData.siteId$,
    this.skipSubject$.pipe(startWith(0)),
    this.searchText.valueChanges.pipe(startWith(''))
  ]).pipe(
    scan<
      [Scalars['UUID'], number, string],
      { siteId: Scalars['UUID']; skip: number; searchText: string }
    >(
      (acc, [siteId, skip, searchText]) => ({
        siteId,
        skip: searchText === acc.searchText ? skip : 0,
        searchText
      }),
      { siteId: '', skip: 0, searchText: '' }
    ),
    shareReplay(1)
  )

  private assetSearchQuery$ = this.queryParams$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(({ siteId, skip, searchText }) =>
      this.ticketsService.getAssetSearchResult(siteId, searchText, skip)
    ),
    catchError(() => EMPTY),
    shareReplay(1)
  )

  public assets$ = this.assetSearchQuery$.pipe(
    map(({ data }) => data && ((data.assetSearch?.items as Asset[]) || [])),
    withLatestFrom(this.queryParams$.pipe(map(({ skip }) => skip))),
    scan<[Asset[], number], Asset[]>((acc, [newAssets, skip]) => {
      if (!newAssets) return acc

      if (skip > 0) {
        return [...acc, ...newAssets]
      }
      return newAssets
    }, [])
  )

  // only take first two emitted observerables from asset search query to get initial loading state
  public initialLoading$: Observable<boolean> = this.assetSearchQuery$.pipe(
    take(INITIAL_ASSET_LIST_GRAPHQL_QUERIES),
    map(({ loading }) => loading)
  )

  // any loading states triggered by clicking loadMore button click after initial loadings
  public loadMoreLoading$: Observable<boolean> = this.assetSearchQuery$.pipe(
    map(({ loading }) => loading)
  )

  public totalCount$: Observable<number> = this.assetSearchQuery$.pipe(
    filter(({ data }) => !!data),
    map(({ data }) => data?.assetSearch?.totalCount || 0)
  )

  public hasMoreAssets$: Observable<boolean> = this.assetSearchQuery$.pipe(
    map(({ data }) => data?.assetSearch?.pageInfo.hasNextPage || false)
  )

  public hasCustomerNumber$ = this.assets$.pipe(
    map((assets) => assets.some((asset) => asset.customerNumber))
  )

  public headers$ = this.hasCustomerNumber$.pipe(
    map((hasCustomerNumber) => {
      const hasAssetInHeader = this.tableHeaders.some(
        (header) => header === ASSET
      )
      if (hasCustomerNumber && !hasAssetInHeader) {
        return [...this.tableHeaders, ASSET]
      }
      return this.tableHeaders
    })
  )

  public hasAssets$: Observable<boolean> = this.assets$.pipe(
    map((asset) => !!asset.length)
  )

  public assetSearch$ = combineLatest([
    this.assets$,
    this.totalCount$,
    this.loadMoreLoading$,
    this.hasMoreAssets$,
    this.hasAssets$,
    this.initialLoading$,
    this.headers$
  ]).pipe(
    map(
      ([
        assets,
        totalCounts,
        loadMoreLoading,
        hasMoreAssets,
        hasAssets,
        initialLoading,
        headers
      ]): AssetSearch => ({
        assets,
        totalCounts,
        loadMoreLoading,
        hasMoreAssets,
        hasAssets,
        initialLoading,
        headers
      })
    ),
    startWith({ initialLoading: true } as AssetSearch)
  )

  /**
   * Set skip subject with new value on load more
   * @param {Asset[]} assets
   */
  public loadMore(assets: Asset[]): void {
    this.skipSubject$.next(assets.length)
  }

  public clearSearchText(): void {
    this.searchText.setValue('')
  }

  public stopBodyScroll(event: Event) {
    event.stopPropagation()
  }
}
