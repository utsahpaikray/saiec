import { AsyncPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { LoadMoreComponent } from '@components/load-more/load-more.component'
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module'
import { SearchInputModule } from '@components/search-input/search-input.module'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { AdminNavigationModule } from '@features/admin-navigation/admin-navigation.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { Store } from '@ngrx/store'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { filterNull } from '@stores/operators'
import { Portal } from '@stores/portals/interfaces/portal.interface'
import { PortalsStoreModule } from '@stores/portals/portals.module'
import { portalsFeature } from '@stores/portals/portals.state'
import {
  Observable,
  Subject,
  combineLatest,
  map,
  of,
  pairwise,
  scan,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs'
import { PortalsListModule } from './components/portals-list/portals-list.module'

const PAGE_SIZE = 30

@Component({
  standalone: true,
  imports: [
    DefaultTemplateModule,
    PortalsListModule,
    AdminNavigationModule,
    AsyncPipe,
    TitleModule,
    SearchInputModule,
    ProgressBarModule,
    LoadMoreComponent,
    TranslocoRootModule,
    PortalsStoreModule,
    CurrentUserStoreModule
  ],
  selector: 'app-portals-overview',
  templateUrl: './portals-overview.component.html',
  styleUrls: ['./portal-overview.component.scss']
})
export class PortalsOverviewComponent {
  private store = inject(Store)

  public portals$ = this.store
    .select(portalsFeature.selectMyPortalsNotLoading)
    .pipe(filterNull())
  public portalLoading$ = this.store
    .select(portalsFeature.selectMyPortals)
    .pipe(map((portals) => portals.loading))
  public isSuperUser$ = this.store.select(currentUserFeature.isSuperUser)

  private searchTextSubject$ = new Subject<string>()
  public searchText$ = this.searchTextSubject$.pipe(startWith(''))
  private showMoreSubject$ = new Subject<void>()

  public itemsShown$: Observable<number> = combineLatest([
    this.searchText$,
    this.showMoreSubject$.pipe(startWith(undefined))
  ]).pipe(
    pairwise(),
    scan((acc, [[previousSearchText], [searchText]]) => {
      if (previousSearchText !== searchText) {
        return PAGE_SIZE
      }
      return acc + PAGE_SIZE
    }, PAGE_SIZE),
    startWith(PAGE_SIZE),
    shareReplay(1)
  )

  public filteredPortals$: Observable<Portal[]> = this.portals$.pipe(
    switchMap((portals) => {
      return combineLatest([of(portals), this.searchText$])
    }),
    map(([portalArray, filterString]) => {
      if (filterString == '') {
        return portalArray
      }

      return portalArray.filter((item) =>
        filterString
          .split(' ')
          .every((filterString) =>
            item.name
              .toLocaleLowerCase()
              .includes(filterString.toLocaleLowerCase())
          )
      )
    })
  )

  public portalsShown$: Observable<Portal[]> = combineLatest([
    this.filteredPortals$,
    this.itemsShown$
  ]).pipe(
    map(([portals, itemsShown]) => {
      return portals.slice(0, itemsShown)
    })
  )

  public hasMore$: Observable<boolean> = combineLatest([
    this.filteredPortals$,
    this.itemsShown$
  ]).pipe(
    map(([portals, itemsShown]) => {
      return portals.length > itemsShown
    })
  )

  public search(searchText: string): void {
    this.searchTextSubject$.next(searchText.trim())
  }
  public showMore(): void {
    this.showMoreSubject$.next()
  }
}
