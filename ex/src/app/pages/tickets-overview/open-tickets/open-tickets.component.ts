import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Scalars, TicketsConnection } from '@core/generated/types'
import { Observable, Subject, map, filter, scan } from 'rxjs'
import { CommonModule } from '@angular/common'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { LoadMoreComponent } from '@components/load-more/load-more.component'
import { TicketsTableComponent } from '../tickets-table/tickets-table.component'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { ApolloQueryResult } from '@apollo/client/core'
import { TicketsService } from '@core/tickets/tickets.service'
import { SiteTicketsQuery } from '@core/tickets/graphql/site-tickets.graphql-gen'

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
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
export class OpenTicketsComponent {
  private activatedRoute = inject(ActivatedRoute)
  private ticketsService = inject(TicketsService)

  public siteId$: Observable<Scalars['UUID']> = this.activatedRoute.params.pipe(
    map((params: Params) => params.siteId),
    filter(Boolean)
  )

  private endCursorSubject$ = new Subject<string>()

  private openTicketsQuery$: Observable<ApolloQueryResult<SiteTicketsQuery>> =
    this.ticketsService.getTicketsQuery(
      this.siteId$,
      this.endCursorSubject$,
      'Closed'
    )

  public loading$: Observable<boolean> = this.openTicketsQuery$.pipe(
    map(({ loading }) => loading)
  )

  public openTickets$: Observable<TicketsConnection> =
    this.openTicketsQuery$.pipe(
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

  public hasMoreOpenTickets$: Observable<boolean> = this.openTickets$.pipe(
    map((data) => data.pageInfo.hasNextPage)
  )

  public endCursor$: Observable<string> = this.openTickets$.pipe(
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
