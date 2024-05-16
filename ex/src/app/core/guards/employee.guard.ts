import { Injectable, inject } from '@angular/core'
import { Router, UrlTree } from '@angular/router'
import { map, Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { currentUserFeature } from 'src/app/stores/current-user/current-user.state'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable()
export class EmployeeGuard {
  private router = inject(Router)
  private store = inject(Store)
  private isEmployee$ = this.store.select(currentUserFeature.isEmployee)

  /**
   * Allow user access only if user type is employee
   * @returns Observable<boolean>
   */

  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.isEmployee$.pipe(
      map(
        (isEmployee) =>
          isEmployee ||
          this.router.createUrlTree(['/', AppRouteSegments.AccessDenied])
      )
    )
  }
}
