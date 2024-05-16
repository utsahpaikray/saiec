import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { environment } from '@environments/environment'
import { OpenTicketsComponent } from './open-tickets/open-tickets.component'

import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { Scalars } from '@core/generated/types'
import { SiteTicketsQuery } from '@core/tickets/graphql/site-tickets.graphql-gen'
import { TicketsService } from '@core/tickets/tickets.service'
import { Store } from '@ngrx/store'
import { maximoFeature } from '@stores/maximo/maximo.state'
import { TabChangeEvent } from '@vanderlande-gravity/components'
import { Observable, Subject, filter, map } from 'rxjs'
import { AllTicketsComponent } from './all-tickets/all-tickets.component'
import { TicketsTabs } from './tickets-tabs.enum'

@Component({
  selector: 'app-tickets-overview',
  templateUrl: './tickets-overview.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoRootModule,
    RouterModule,
    OpenTicketsComponent,
    AllTicketsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsOverviewComponent {
  public viewAllTicketsUrl: string = environment.viewAllTicketsUrl
  public createTicketUrl: string = environment.createTicketUrl

  public activeTab: string = TicketsTabs.Open
  public TicketsTabs = TicketsTabs
  public openTicketsCount: number

  private activatedRoute = inject(ActivatedRoute)
  private ticketsService = inject(TicketsService)

  private store = inject(Store)

  public hasWriteAccess$ = this.store.select(
    maximoFeature.hasWriteAccessNotLoading
  )

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

  public openTicketsCount$: Observable<number> = this.openTicketsQuery$.pipe(
    map(({ data }) => (data && data.tickets?.totalCount) || 0)
  )

  /**
   * Redirect to maximo View All Tickets external url
   * @param {event} Event
   */
  public viewAllTickets(event: Event): void {
    event.preventDefault()
    window.open(this.viewAllTicketsUrl, '_blank')
  }

  /**
   * Set active tab
   * @param {event} TabChangeEvent
   */
  public onTabChange(event: TabChangeEvent<string>): void {
    this.activeTab = event.detail.value
  }
}
