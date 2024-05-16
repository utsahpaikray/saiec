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
import { WarrantyClaimsService } from '@core/warranty-claims/warranty-claims.service'

export interface SelectItemDialogVM {
  siteId$: Observable<Scalars['UUID']>
}

interface ItemSearch {
  items?: Asset[]
  loadMoreLoading?: boolean
  totalCounts?: number
  hasMoreItems?: boolean
  hasItems?: boolean
  initialLoading?: boolean
}

// To get the initial list of graphql queries, we need two queries to perform the operational task,
// The first one is the loading state query for item list, and the second one is the data.
// INITIAL_ITEM_LIST_GRAPHQL_QUERIES = loading query + data query
const INITIAL_ITEM_LIST_GRAPHQL_QUERIES: number = 2

@Component({
  selector: 'app-select-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    LoadMorePaginatorComponent,
    LoadMoreComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './select-item-dialog.component.html',
  styleUrls: ['./select-item-dialog.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectItemDialogComponent {
  private readonly windowResizeService = inject(WindowResizeService)
  private readonly warrantyClaimsService = inject(WarrantyClaimsService)
  public readonly dialogRef = inject(DIALOG_REF)
  public readonly dialogData: SelectItemDialogVM = inject(DIALOG_DATA)
  public readonly tableHeaders: string[] = [
    'ItemNumber',
    'Description',
    'Classification',
    'Category'
  ]

  public searchText: FormControl<string> = new FormControl()
  public breakpoint$: Observable<Viewports> =
    this.windowResizeService.breakpoint$
  public readonly viewports = Viewports

  private skipSubject$ = new Subject<number>()

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

  public itemSearchQuery$ = this.queryParams$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(({ siteId, skip, searchText }) =>
      this.warrantyClaimsService.getItemSearchResult(siteId, searchText, skip)
    ),
    catchError(() => EMPTY),
    shareReplay(1)
  )

  public items$ = this.itemSearchQuery$.pipe(
    map(({ data }) => data && ((data.itemSearch?.items as Asset[]) || [])),
    withLatestFrom(this.queryParams$.pipe(map(({ skip }) => skip))),
    scan<[Asset[], number], Asset[]>((acc, [newItems, skip]) => {
      if (!newItems) return acc

      if (skip > 0) {
        return [...acc, ...newItems]
      }
      return newItems
    }, [])
  )

  // only take first two emitted observerables from asset search query to get initial loading state
  public initialLoading$: Observable<boolean> = this.itemSearchQuery$.pipe(
    take(INITIAL_ITEM_LIST_GRAPHQL_QUERIES),
    map(({ loading }) => loading)
  )

  // any loading states triggered by clicking loadMore button click after initial loadings
  public loadMoreLoading$: Observable<boolean> = this.itemSearchQuery$.pipe(
    map(({ loading }) => loading)
  )

  public totalCount$: Observable<number> = this.itemSearchQuery$.pipe(
    filter(({ data }) => !!data),
    map(({ data }) => data?.itemSearch?.totalCount || 0)
  )

  public hasMoreItems$: Observable<boolean> = this.itemSearchQuery$.pipe(
    map(({ data }) => data?.itemSearch?.pageInfo.hasNextPage || false)
  )

  public hasItem$: Observable<boolean> = this.items$.pipe(
    map((item) => !!item.length)
  )

  public itemSearch$ = combineLatest([
    this.items$,
    this.totalCount$,
    this.loadMoreLoading$,
    this.hasMoreItems$,
    this.hasItem$,
    this.initialLoading$
  ]).pipe(
    map(
      ([
        items,
        totalCounts,
        loadMoreLoading,
        hasMoreItems,
        hasItems,
        initialLoading
      ]): ItemSearch => ({
        items,
        totalCounts,
        loadMoreLoading,
        hasMoreItems,
        hasItems,
        initialLoading
      })
    ),
    startWith({ initialLoading: true } as ItemSearch)
  )

  /**
   * Set skip subject with new value on load more
   * @param {Asset[]} items
   */
  public loadMore(items: Asset[]): void {
    this.skipSubject$.next(items.length)
  }

  public clearSearchText(): void {
    this.searchText.setValue('')
  }

  public stopBodyScroll(event: Event) {
    event.stopPropagation()
  }
}
