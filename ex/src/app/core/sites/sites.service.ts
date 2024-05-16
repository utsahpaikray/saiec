import { Injectable, inject } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'

import { Observable, Subject } from 'rxjs'
import { first, map, switchMap } from 'rxjs/operators'
import { CurrentUserService } from '../current-user/current-user.service'
import { Segment, Site } from '../generated/types'
import {
  ContactsBySiteIdGQL,
  ContactsBySiteIdQuery
} from './graphql/contacts-by-site-id.graphql-gen'

import { SiteByIdGQL } from './graphql/site-by-id.query.graphql-gen'
import {
  SiteNavigationGQL,
  SiteNavigationQuery
} from './graphql/site-navigation.graphql-gen'
import { UserSiteByIdGQL } from './graphql/user-site-by-id.query.graphql-gen'
import {
  UserSiteNavigationGQL,
  UserSiteNavigationQuery
} from './graphql/user-site-navigation.graphql-gen'
import { SiteContacts } from './sites.model'
import { SourceIdByIdGQL } from './graphql/source-id-by-id.query.graphql-gen'
import {
  SiteProjectsSegmentGQL,
  SiteProjectsSegmentQuery
} from './graphql/site-projects-segment.graphql-gen'
import {
  UserSiteProjectsSegmentGQL,
  UserSiteProjectsSegmentQuery
} from './graphql/user-site-projects-segment.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private currentUserService = inject(CurrentUserService)
  private userSiteByIdGQL = inject(UserSiteByIdGQL)
  private siteByIdGQL = inject(SiteByIdGQL)
  private sourceIdByIdGQL = inject(SourceIdByIdGQL)
  private contactsBySiteId = inject(ContactsBySiteIdGQL)
  private siteNavigationGQL = inject(SiteNavigationGQL)
  private userSiteNavigationGQL = inject(UserSiteNavigationGQL)
  private siteProjectsSegmentGQL = inject(SiteProjectsSegmentGQL)
  private userSiteProjectsSegmentGQL = inject(UserSiteProjectsSegmentGQL)

  public siteNavigationSettings$ = new Subject<Site>()
  private siteNavigationSettings: Site

  /**
   * Get site data by id
   * @param {string} siteId
   * @returns {Observable<Site>}
   */
  public getSiteById(siteId: string): Observable<Site> {
    return this.currentUserService.userData$.pipe(
      first(),
      switchMap(() => {
        if (
          !this.currentUserService.isSuperUser &&
          !this.currentUserService.isPortalAdmin
        ) {
          return this.getSiteDataFromMeEndpoint(siteId)
        }
        return this.getSiteData(siteId)
      })
    )
  }

  /**
   * Get sites source-id by id
   * @param {string} siteId
   * @returns {Observable<string>}
   */
  public getSourceIdById(siteId: string): Observable<string> {
    return this.sourceIdByIdGQL
      .fetch({
        id: siteId
      })
      .pipe(map((result) => result.data?.sites?.[0]?.sourceId))
  }

  /**
   * Get site data from me endpoint
   * @param {string} siteId
   * @returns {Observable<Site>}
   */
  private getSiteDataFromMeEndpoint(siteId: string): Observable<Site> {
    return this.userSiteByIdGQL
      .fetch({
        id: siteId
      })
      .pipe(
        map((result) => result.data?.me?.relatedPortalData?.sites[0] as Site)
      )
  }

  /**
   * Get site data
   * @param {string} siteId
   * @returns {Observable<Site>}
   */
  private getSiteData(siteId: string): Observable<Site> {
    return this.siteByIdGQL
      .fetch({
        id: siteId
      })
      .pipe(map((result) => result.data?.sites[0] as Site))
  }

  /**
   * Get site contacts data
   * @param {string} siteId
   * @returns {Observable<SiteContactsInput>}
   */
  public getSiteContacts(siteId: string): Observable<SiteContacts> {
    return this.contactsBySiteId
      .fetch({
        siteId
      })
      .pipe(
        map(
          (result: ApolloQueryResult<ContactsBySiteIdQuery>) =>
            result.data.sites[0] as SiteContacts
        )
      )
  }

  /**
   * Set site navigation settings
   * @param {string} siteId
   */
  public setSiteNavigationSettings(siteId: string): void {
    this.getSiteNavigationSettings(siteId).subscribe({
      next: (site: Site) => {
        this.siteNavigationSettings = site
        this.siteNavigationSettings$.next({ ...this.siteNavigationSettings })
      },
      error: () => {}
    })
  }

  /**
   * Get site navigation settings
   * @param {string} siteId
   * @returns {Observable<Site>}
   */
  public getSiteNavigationSettings(siteId: string): Observable<Site> {
    if (
      this.currentUserService.isSuperUser ||
      this.currentUserService.isPortalAdmin
    ) {
      return this.siteNavigationGQL
        .fetch({
          siteId: siteId
        })
        .pipe(
          map(
            (result: ApolloQueryResult<SiteNavigationQuery>) =>
              result.data.sites[0] as Site
          )
        )
    }

    return this.userSiteNavigationGQL
      .fetch({
        siteId: siteId
      })
      .pipe(
        map(
          (result: ApolloQueryResult<UserSiteNavigationQuery>) =>
            result.data.me?.relatedPortalData?.sites[0] as Site
        )
      )
  }

  /**
   * Get site projects segment based on role
   * @returns {Observable<Segment | null>}
   */
  public getSiteProjectsSegmentBasedOnRole(
    siteId: string
  ): Observable<Segment | null> {
    if (
      this.currentUserService.isSuperUser ||
      this.currentUserService.isPortalAdmin
    ) {
      return this.getSiteProjectsSegment(siteId).pipe(
        map(({ data }) => data?.sites[0]?.projects[0]?.segment || null)
      )
    }

    return this.getUserSiteProjectsSegment(siteId).pipe(
      map(
        ({ data }) =>
          data?.me?.relatedPortalData?.sites[0]?.projects[0]?.segment || null
      )
    )
  }

  /**
   * Get site projects segment
   * use no-cache fetch policy as data is imported, no refetch query is possible
   * @returns {Observable<ApolloQueryResult<SiteProjectsSegmentQuery>>}
   */
  public getSiteProjectsSegment(
    siteId: string
  ): Observable<ApolloQueryResult<SiteProjectsSegmentQuery>> {
    return this.siteProjectsSegmentGQL.watch(
      { id: siteId },
      { fetchPolicy: 'no-cache', useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Get user site projects segment from me endpoint
   * use no-cache fetch policy as data is imported, no refetch query is possible
   * @returns {Observable<ApolloQueryResult<UserSiteProjectsSegmentQuery>>}
   */
  public getUserSiteProjectsSegment(
    siteId: string
  ): Observable<ApolloQueryResult<UserSiteProjectsSegmentQuery>> {
    return this.userSiteProjectsSegmentGQL.watch(
      { id: siteId },
      { fetchPolicy: 'no-cache', useInitialLoading: true }
    ).valueChanges
  }
}
