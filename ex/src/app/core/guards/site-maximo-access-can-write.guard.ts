import { Injectable, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router'
import { Location } from '@angular/common'
import { MaximoAccessService } from '../maximo-access/maximo-access.service'
import { map, Observable, of } from 'rxjs'
import { MaximoUserAccess } from '../generated/types'
import { LogExecution } from '@shared/decorators/log-execution.decorator'

@Injectable()
export class SiteMaximoAccessCanWriteGuard {
  private readonly maximoAccessService = inject(MaximoAccessService)
  private readonly location = inject(Location)
  private readonly router = inject(Router)

  /**
   * Allow user access only if they have maximo access can write permissions per site
   * @returns Observable<boolean>
   */
  @LogExecution()
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const hasMaximoAccess =
      Object.keys(this.maximoAccessService.maximoAccess).length > 0

    // Check if maximo user access is already set in the service
    if (hasMaximoAccess) {
      !this.maximoAccessService.canWriteTickets &&
        this.router.navigate(['/access-denied']).then(() => {
          this.location.replaceState(state.url)
        })

      return of(this.maximoAccessService.canWriteTickets)
    } else {
      this.maximoAccessService.setMaximoUserAccessBySiteId(next.params.siteId)

      return this.maximoAccessService.maximoUserAccess$.pipe(
        map((maximoAccess: MaximoUserAccess) => {
          // go to access denied page if no write rights
          !maximoAccess.canWriteTickets &&
            this.router.navigate(['/access-denied']).then(() => {
              this.location.replaceState(state.url)
            })

          return maximoAccess.canWriteTickets
        })
      )
    }
  }
}
