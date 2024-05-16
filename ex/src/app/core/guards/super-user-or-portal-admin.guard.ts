// Super user Service
import { Injectable, inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable()
export class SuperUserOrPortalAdminGuard {
  private router = inject(Router)
  private store = inject(Store)

  private isSuperUserOrPortalAdmin$ = this.store.select(
    currentUserFeature.isSuperUserOrPortalAdmin
  )

  /**
   * Allow user access only if they are super user or portal admin
   * @returns Observable<boolean>
   */
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.isSuperUserOrPortalAdmin$.pipe(
      map(
        (isSuperUserOrPortalAdmin) =>
          isSuperUserOrPortalAdmin ||
          this.router.createUrlTree(['/', AppRouteSegments.AccessDenied])
      )
    )
  }
}
