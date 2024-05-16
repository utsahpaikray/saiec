import { Injectable } from '@angular/core'
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client'
import { combineLatest, Observable } from 'rxjs'
import { map, skipWhile, switchMap } from 'rxjs/operators'

import { UserData } from '@core/interfaces/user-data.interface'
import { TokenUserData } from '@core/interfaces/token-user-data.interface'
import { Roles } from '@core/interfaces/roles.enum'
import { CurrentUserGQL } from './graphql/current-user.graphql-gen'
import { Portal, Site } from '../generated/types'

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public userData$: Observable<UserData>
  public roles: Roles[]

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private currentUserGQL: CurrentUserGQL
  ) {
    this.userData$ = combineLatest([this.tokenUserData$, this.meData$]).pipe(
      map(([tokenUserData, meData]: [TokenUserData, any]) => {
        this.roles = tokenUserData?.role || []
        return {
          roles: this.roles || [],
          id: tokenUserData?.sub || null,
          ...meData
        }
      })
    )
  }

  /**
   * Check if current user is super user
   * @returns {boolean}
   */
  public get isSuperUser(): boolean {
    return !!this.roles?.length && this.roles.indexOf(Roles.SuperUser) > -1
  }

  /**
   * Check if current user is portal admin
   * @returns {boolean}
   */
  public get isPortalAdmin(): boolean {
    return !!this.roles?.length && this.roles.indexOf(Roles.PortalAdmin) > -1
  }

  /**
   * Check if current user is customer user
   * @returns {boolean}
   */
  public get isCustomerUser(): boolean {
    return !!this.roles?.length && this.roles.indexOf(Roles.User) > -1
  }

  /**
   * Check if current user is Vanderlande user
   * @returns {boolean}
   */
  public get isVanderlandeUser(): boolean {
    return (
      !!this.roles?.length && this.roles.indexOf(Roles.VanderlandeUser) > -1
    )
  }

  /**
   * User portals
   */
  public get userPortals$(): Observable<Portal[]> {
    return this.userData$.pipe(
      map((userData) => {
        return (userData.me?.relatedPortalData?.portals as Portal[]) || []
      })
    )
  }

  /**
   * User sites
   */
  public get userSites$(): Observable<Site[]> {
    return this.userData$.pipe(
      map((userData) => {
        return (userData.me?.relatedPortalData?.sites as Site[]) || []
      })
    )
  }

  /**
   * Does user have access to portal overview?
   * @returns {Observable<boolean>}
   *
   */
  public get hasAccessToPortalOverview$(): Observable<boolean> {
    return this.userData$.pipe(
      map((userData) => {
        if (userData?.roles?.length === 0) {
          return false
        }

        // Super user always has access to portal overview
        if (userData.roles.indexOf(Roles.SuperUser) > -1) {
          return true
        }

        // Portal admin or vanderlander user only has access to portal overview if they have multiple portals
        if (
          userData.roles.indexOf(Roles.PortalAdmin) > -1 ||
          userData.roles.indexOf(Roles.VanderlandeUser) > -1
        ) {
          const userPortals = userData.me?.relatedPortalData?.portals || []
          return userPortals.length > 1
        }

        // Other users can never access the portal overview
        return false
      })
    )
  }

  /**
   * Get roles from token user data
   */
  private get tokenUserData$(): Observable<TokenUserData> {
    return this.oidcSecurityService.userData$.pipe(
      map((data: UserDataResult) => data?.userData)
    )
  }

  /**
   * Get me data from graphql
   */
  private get meData$(): Observable<any> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      skipWhile(({ isAuthenticated }) => !isAuthenticated),
      switchMap(() => {
        return this.currentUserGQL
          .watch()
          .valueChanges.pipe(map((result) => result.data))
      })
    )
  }
}
