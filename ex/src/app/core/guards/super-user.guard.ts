// Super user Service
import { Injectable, inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'

@Injectable()
export class SuperUserGuard {
  private router = inject(Router)
  private store = inject(Store)

  private isSuperUser$ = this.store.select(currentUserFeature.isSuperUser)

  /**
   * Allow user access only if they are super user or portal admin
   * @returns Observable<boolean>
   */
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.isSuperUser$.pipe(
      map(
        (isSuperUser) =>
          isSuperUser ||
          this.router.createUrlTree(['/', AppRouteSegments.AccessDenied])
      )
    )
  }
}
