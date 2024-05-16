import { inject, Injectable } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { PortalRouteSegments } from '@pages/portal/portal-route-segments.enum'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { filterNull } from '@stores/operators'
import { portalsFeature } from '@stores/portals/portals.state'
import { sitesFeature } from '@stores/sites/sites.state'
import { combineLatest, map, Observable, of, switchMap } from 'rxjs'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'

@Injectable()
export class SingleSiteGuard {
  private router = inject(Router)
  private store = inject(Store)

  private sites$ = this.store
    .select(sitesFeature.selectSitesNotLoading)
    .pipe(filterNull())

  private portalId$ = this.store.select(portalsFeature.selectCurrentPortalId)

  private isSuperUserOrPortalAdmin$ = this.store.select(
    currentUserFeature.isSuperUserOrPortalAdmin
  )
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.isSuperUserOrPortalAdmin$.pipe(
      switchMap((isSuperUserOrPortalAdmin) => {
        if (isSuperUserOrPortalAdmin) {
          return of(true)
        }
        return combineLatest([this.sites$, this.portalId$]).pipe(
          map(([sites, portalId]) => {
            switch (sites.length) {
              case 0:
                return this.router.createUrlTree([
                  '/',
                  AppRouteSegments.Portals,
                  portalId,
                  PortalRouteSegments.Sites,
                  SiteRouteSegments.NotFound
                ])
              case 1:
                return this.router.createUrlTree([
                  '/',
                  AppRouteSegments.Portals,
                  portalId,
                  PortalRouteSegments.Sites,
                  sites[0].id
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
