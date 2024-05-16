import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import {
  CertificationPathByIdGQL,
  CertificationPathByIdQuery
} from '@core/cms-training-assortments/graphql/cms-certification-path-by-id.graphql-gen'
import { PortalRouteSegments } from '@pages/portal/portal-route-segments.enum'
import { SiteRouteSegments } from '@pages/site/site-route-segments.enum'
import { map, Observable } from 'rxjs'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable({
  providedIn: 'root'
})
export class CertificationPathGuard {
  private router = inject(Router)
  private certificationPathByIdGQL = inject(CertificationPathByIdGQL)

  private getTraningUrlTree = (portalId: string, siteId: string) =>
    this.router.createUrlTree([
      '/',
      AppRouteSegments.Portals,
      portalId,
      PortalRouteSegments.Sites,
      siteId,
      SiteRouteSegments.Training
    ])

  @LogExecution()
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.certificationPathByIdGQL
      .fetch({
        id: route.params.certificateId
      })
      .pipe(
        map((result: ApolloQueryResult<CertificationPathByIdQuery>) => {
          const hasCertificationPath = !!result.data.certificationPath
          // If certification path does not exist, redirect to site training page
          return (
            hasCertificationPath ||
            this.getTraningUrlTree(route.params.portalId, route.params.siteId)
          )
        })
      )
  }
}
