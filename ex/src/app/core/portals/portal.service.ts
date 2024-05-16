import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { CurrentUserService } from '../current-user/current-user.service'
import { Portal } from '../generated/types'
import {
  PortalByIdGQL,
  PortalByIdQuery
} from './graphql/portal-by-id.query.graphql-gen'
import { AllPortalsGQL } from './graphql/portals.query.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  constructor(
    private allPortalsGQL: AllPortalsGQL,
    private currentUserService: CurrentUserService,
    private portalByIdGQL: PortalByIdGQL
  ) {}

  /**
   * Get all portals id and name
   * If user is super user get all portals
   * If user is not super user get portals from user data
   * @returns {Observable<Portal[]>}
   */
  getPortals(): Observable<Portal[]> {
    const collator = new Intl.Collator()
    if (!this.currentUserService.isSuperUser) {
      return this.currentUserService.userPortals$
    }
    return this.allPortalsGQL.fetch().pipe(
      map((result) =>
        [...(<Portal[]>result.data?.portals)].sort((a, b) => {
          return collator.compare(a.name, b.name)
        })
      )
    )
  }

  /**
   * Get portal id and name
   * If user is super user get portal from query
   * If user is not super user get portal from user data
   * @returns {Observable<Portal>}
   */
  getPortalById(portalId: string): Observable<Portal> {
    if (!this.currentUserService.isSuperUser) {
      return this.currentUserService.userPortals$.pipe(
        map(
          (portals) =>
            portals.find((portal) => portal.id === portalId) as Portal
        )
      )
    }
    return this.portalByIdGQL
      .fetch({
        id: portalId
      })
      .pipe(
        map(
          (result: ApolloQueryResult<PortalByIdQuery>) =>
            result.data?.portals[0] as Portal
        )
      )
  }
}
