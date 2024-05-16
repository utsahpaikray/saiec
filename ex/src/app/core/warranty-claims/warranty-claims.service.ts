import { Injectable, inject } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Observable } from 'rxjs'
import {
  SiteWarrantyItemSearchGQL,
  SiteWarrantyItemSearchQuery
} from './graphql/site-warranty-item-search.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class WarrantyClaimsService {
  private readonly siteWarrantyItemSearchGQL = inject(SiteWarrantyItemSearchGQL)

  /**
   * Run query for warranty item search
   * @param {string} siteId
   * @param {string} searchText
   * @param {number} skip
   * @returns { Observable<ApolloQueryResult<SiteWarrantyItemSearchQuery>>}
   */
  public getItemSearchResult(
    siteId: string,
    searchText: string,
    skip: number
  ): Observable<ApolloQueryResult<SiteWarrantyItemSearchQuery>> {
    return this.siteWarrantyItemSearchGQL.watch(
      { siteId, searchText, skip },
      { useInitialLoading: true }
    ).valueChanges
  }
}
