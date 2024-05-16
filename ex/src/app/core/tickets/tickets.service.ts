import { Injectable, inject } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Scalars } from '@core/generated/types'
import {
  SiteTicketsGQL,
  SiteTicketsQuery
} from '@core/tickets/graphql/site-tickets.graphql-gen'

import {
  SiteTicketContactsGQL,
  SiteTicketContactsQuery
} from './graphql/site-ticket-contacts.graphql-gen'
import {
  Observable,
  Subject,
  combineLatest,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs'
import {
  SiteTicketAssetSearchGQL,
  SiteTicketAssetSearchQuery
} from '@features/select-asset-dialog/graphql/site-ticket-asset-search.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private siteTicketGQL = inject(SiteTicketsGQL)
  private siteTicketAssetSearchGQL = inject(SiteTicketAssetSearchGQL)
  private siteTicketContactsGQL = inject(SiteTicketContactsGQL)

  /**
   * Get tickets query
   * @param {Observable<Scalars['UUID']>}
   * @param {Subject<string>}
   * @returns {ApolloQueryResult<SiteTicketsQuery>}
   */
  getTicketsQuery(
    siteId$: Observable<Scalars['UUID']>,
    endCursorSubject$: Subject<string>,
    sourceState: string
  ): Observable<ApolloQueryResult<SiteTicketsQuery>> {
    return combineLatest([
      siteId$,
      endCursorSubject$.pipe(startWith(undefined))
    ]).pipe(
      switchMap(
        ([siteId, endCursor]) =>
          this.siteTicketGQL.watch(
            { siteId, endCursor, sourceState },
            { useInitialLoading: true }
          ).valueChanges
      ),
      shareReplay(1)
    )
  }

  /**
   * Run query for asset search
   * @param {Scalars['UUID']} siteId
   * @param {string} searchText
   * @param {number} skip
   * @returns { Observable<ApolloQueryResult<SiteTicketAssetSearchQuery>>}
   */
  getAssetSearchResult(
    siteId: Scalars['UUID'],
    searchText: string,
    skip: number
  ): Observable<ApolloQueryResult<SiteTicketAssetSearchQuery>> {
    return this.siteTicketAssetSearchGQL.watch(
      {
        siteId,
        searchText,
        skip
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Run query to get site ticket contacts for the siteId specified
   * @returns { Observable<ApolloQueryResult<SiteTicketContactsQuery>>}
   */
  getSiteTicketContacts(
    siteId: Scalars['UUID']
  ): Observable<ApolloQueryResult<SiteTicketContactsQuery>> {
    return this.siteTicketContactsGQL.watch(
      {
        siteId
      },
      { useInitialLoading: true }
    ).valueChanges
  }
}
