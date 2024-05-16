import { inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import { applicationFeature } from '@stores/application/application.state'
import { Applications } from '@stores/application/interfaces/application.interface'
import { filter, map, Observable } from 'rxjs'

const isApplication = (module: unknown): module is Applications =>
  Object.values(Applications).includes(module as Applications)

@Injectable()
export class ApplicationsGuard {
  private store = inject(Store)
  private readonly router = inject(Router)

  private applications$ = this.store.select(
    applicationFeature.selectApplicationsState
  )

  @LogExecution()
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const module = next.data.module
    if (!isApplication(module)) {
      throw new Error('Invalid application module')
    }
    return this.applications$.pipe(
      map((state) => state[module]),
      filter(
        (application): application is { enabled: boolean } =>
          application.enabled !== null
      ),
      map(
        (application) => application.enabled
        //  this.router.createUrlTree(['./', SiteRouteSegments.AccessDenied])
      )
    )
  }
}
