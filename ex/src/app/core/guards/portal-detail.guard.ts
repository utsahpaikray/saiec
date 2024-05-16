import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Store } from '@ngrx/store'
import { portalsFeature } from '@stores/portals/portals.state'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import { filterNull } from '@stores/operators'

@Injectable()
export class PortalDetailGuard {
  private readonly store = inject(Store)
  private readonly router = inject(Router)

  private readonly portals$ = this.store
    .select(portalsFeature.selectMyPortalsNotLoading)
    .pipe(filterNull())

  /**
   * Check if portal exists and user has access. Otherwise show not found page
   * @returns Observable<boolean>
   */

  @LogExecution()
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.portals$.pipe(
      map(
        (portals) =>
          portals?.some((portal) => portal.id === next.params.portalId) ||
          this.router.createUrlTree(['/', AppRouteSegments.NotFound])
      )
    )
  }
}
