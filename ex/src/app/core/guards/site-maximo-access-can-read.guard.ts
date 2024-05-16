import { Injectable, inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import { maximoFeature } from '@stores/maximo/maximo.state'
import { filterNull } from '@stores/operators'
import { Observable, map } from 'rxjs'

@Injectable()
export class SiteMaximoAccessCanReadGuard {
  private readonly store = inject(Store)
  private readonly router = inject(Router)

  /**
   * Allow user access only if they have maximo access can read permissions per site
   * @returns Observable<boolean>
   */
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(maximoFeature.hasReadAccessNotLoading).pipe(
      filterNull(),
      map(
        (canReadTickets) =>
          canReadTickets ||
          this.router.createUrlTree(['./', SiteRouteSegments.AccessDenied])
      )
    )
  }
}
