import { inject, Injectable } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { Store } from '@ngrx/store'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { filterNull } from '@stores/operators'
import { portalsFeature } from '@stores/portals/portals.state'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'

@Injectable()
export class PortalOverviewGuard {
  private store = inject(Store)
  private router = inject(Router)

  private portals$ = this.store
    .select(portalsFeature.selectMyPortalsNotLoading)
    .pipe(filterNull())

  private isSuperUserOrPortalAdmin$ = this.store.select(
    currentUserFeature.isSuperUserOrPortalAdmin
  )
  /**
   * Check if user can access portals overview page
   * @returns Observable<boolean>
   */
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.isSuperUserOrPortalAdmin$.pipe(
      switchMap((isSuperUserOrPortalAdmin) => {
        if (isSuperUserOrPortalAdmin) {
          return of(true)
        }
        return this.portals$.pipe(
          map((portals) => {
            switch (portals.length) {
              case 0:
                return this.router.createUrlTree([
                  '/',
                  AppRouteSegments.AccessDenied
                ])
              case 1:
                return this.router.createUrlTree([
                  '/',
                  AppRouteSegments.Portals,
                  portals[0].id
                ])
              default:
                return true
            }
          })
        )
      })
    )
  }
}
