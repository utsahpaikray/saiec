import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { sitesFeature } from '@stores/sites/sites.state'
import { filterNull } from '@stores/operators'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable()
export class SiteDetailGuard {
  private readonly store = inject(Store)
  private readonly router = inject(Router)
  private readonly sites$ = this.store
    .select(sitesFeature.selectSitesNotLoading)
    .pipe(filterNull())

  @LogExecution()
  public canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    return this.sites$.pipe(
      map(
        (sites) =>
          sites.some((site) => site.id === next.params.siteId) ||
          this.router.createUrlTree(['./', SiteRouteSegments.NotFound])
      )
    )
  }
}
