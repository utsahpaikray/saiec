import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TicketsTableComponent } from '../tickets-table/tickets-table.component'
import { LoadMoreComponent } from '@components/load-more/load-more.component'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { SiteTicketsQuery } from '../../../core/tickets/graphql/site-tickets.graphql-gen'
import { Observable, Subject, filter, map, scan } from 'rxjs'
import { Scalars, TicketsConnection } from '@core/generated/types'
import { ApolloQueryResult } from '@apollo/client/core'
import { TicketsService } from '@core/tickets/tickets.service'

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoRootModule,
    TicketsTableComponent,
    LoadMoreComponent,
    ProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllTicketsComponent {
  private activatedRoute = inject(ActivatedRoute)
  private ticketsService = inject(TicketsService)

  public siteId$: Observable<Scalars['UUID']> = this.activatedRoute.params.pipe(
    map((params: Params) => params.siteId),
    filter(Boolean)
  )

  private endCursorSubject$ = new Subject<string>()

  private allTicketsQuery$: Observable<ApolloQueryResult<SiteTicketsQuery>> =
    this.ticketsService.getTicketsQuery(
      this.siteId$,
      this.endCursorSubject$,
      ''
    )

  public loading$: Observable<boolean> = this.allTicketsQuery$.pipe(
    map(({ loading }) => loading)
  )

  public allTickets$: Observable<TicketsConnection> =
    this.allTicketsQuery$.pipe(
      map(({ data }) => data && (data.tickets as TicketsConnection)),
      scan((acc, newTickets) => {
        if (!newTickets) return acc

        if (acc && acc.nodes && newTickets.nodes) {
          return {
            nodes: [...acc.nodes, ...newTickets.nodes],
            pageInfo: newTickets.pageInfo,
            totalCount: newTickets.totalCount
          }
        }
        return newTickets
      })
    )

  public hasMoreTickets$: Observable<boolean> = this.allTickets$.pipe(
    map((data) => data.pageInfo.hasNextPage)
  )

  public endCursor$: Observable<string> = this.allTickets$.pipe(
    map((data) => data.pageInfo.endCursor || '')
  )

  /**
   * Set end cursor subject with new value on load more
   * @param {string} endCursor
   */
  public loadMore(endCursor: string): void {
    this.endCursorSubject$.next(endCursor)
  }
}
