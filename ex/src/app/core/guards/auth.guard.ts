import { inject, Injectable } from '@angular/core'
import { UrlTree } from '@angular/router'
import { Store } from '@ngrx/store'
import { LogExecution } from '@shared/decorators/log-execution.decorator'
import currentUserActions from '@stores/current-user/current-user.actions'
import { filterNull } from '@stores/operators'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { currentUserFeature } from 'src/app/stores/current-user/current-user.state'

@Injectable()
export class AuthGuard {
  private store = inject(Store)

  private isAuthenticated$ = this.store
    .select(currentUserFeature.isAuthenticated)
    .pipe(filterNull())

  /**
   * Allow user access if they are authenticated
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean>}
   */
  @LogExecution()
  canActivate(): Observable<boolean | UrlTree> {
    return this.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          return
        }
        this.store.dispatch(currentUserActions.login({}))
      })
    )
  }
}
