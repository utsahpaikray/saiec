import { Injectable, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { PortalRouteSegments } from '@pages/portal/portal-route-segments.enum'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'
import {
  TrainingDetailGQL,
  TrainingDetailQuery
} from '@pages/training-detail/graphql/cms-training-detail.graphql-gen'
import { catchError, map, Observable, of } from 'rxjs'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable({
  providedIn: 'root'
})
export class TrainingGuard {
  private readonly trainingDetailGQL = inject(TrainingDetailGQL)
  private readonly router = inject(Router)

  @LogExecution()
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (state.url.includes('/training/certifications')) {
      return of(true)
    }
    return this.trainingDetailGQL
      .fetch({
        id: next.params.trainingId
      })
      .pipe(
        map((result: ApolloQueryResult<TrainingDetailQuery>) => {
          const hasTraining = !!result.data.training
          return (
            hasTraining ||
            this.router.createUrlTree([
              '/',
              AppRouteSegments.Portals,
              next.params.portalId,
              PortalRouteSegments.Sites,
              next.params.siteId,
              SiteRouteSegments.Training
            ])
          )
        }),
        catchError(() =>
          of(this.router.createUrlTree(['/', AppRouteSegments.NotFound]))
        )
      )
  }
}
