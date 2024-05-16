import { inject, Injectable } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { combineLatest, Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { Store } from '@ngrx/store'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { portalsFeature } from '@stores/portals/portals.state'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { PortalsRouteSegments } from '@pages/portals/portals-route-segments'
import { filterNull } from '@stores/operators'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable()
export class PortalsGuard {
  private router = inject(Router)
  private store = inject(Store)

  private isSuperUserOrPortalAdmin$ = this.store.select(
    currentUserFeature.isSuperUserOrPortalAdmin
  )
  private isVanderlandeUser$ = this.store.select(
    currentUserFeature.isVanderlandeUser
  )
  private isCustomerUser$ = this.store.select(currentUserFeature.isCustomerUser)
  private portals$ = this.store
    .select(portalsFeature.selectMyPortalsNotLoading)
    .pipe(filterNull())

  private noPortalsLink = this.router.createUrlTree([
    '/',
    AppRouteSegments.Portals,
    PortalsRouteSegments.NoPortals
  ])
  private noAccessLink = this.router.createUrlTree([
    '/',
    AppRouteSegments.AccessDenied
  ])

  /**
   * Check if user can access portals route (at least one of it's child routes)
   * @returns Observable<boolean | UrlTree>
   */
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest({
      isSuperUserOrPortalAdmin: this.isSuperUserOrPortalAdmin$,
      isVanderlandeUser: this.isVanderlandeUser$,
      isCustomerUser: this.isCustomerUser$
    }).pipe(
      switchMap(
        ({ isSuperUserOrPortalAdmin, isVanderlandeUser, isCustomerUser }) => {
          if (isSuperUserOrPortalAdmin) {
            return of(true)
          }
          if (isVanderlandeUser || isCustomerUser) {
            return this.portals$.pipe(
              map((portals) => (portals.length > 0 ? true : this.noPortalsLink))
            )
          }
          return of(this.noAccessLink)
        }
      )
    )
  }
}
