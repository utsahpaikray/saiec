import { Injectable } from '@angular/core'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { TranslocoService } from '@ngneat/transloco'
import { map, Observable, Subject } from 'rxjs'
import { MaximoUserAccess } from '../generated/types'
import { SiteMaximoAccessGQL } from './graphql/site-maximo-access.graphql-gen'
import {
  MaximoAccessErrorHandler,
  MaximoAccessErrorTrigger
} from './maximo-access.model'

@Injectable({
  providedIn: 'root'
})
export class MaximoAccessService {
  constructor(
    private siteMaximoAccessGQL: SiteMaximoAccessGQL,
    private toastService: ToasterService,
    private translocoService: TranslocoService
  ) {}

  public maximoUserAccess$ = new Subject<MaximoUserAccess>()

  private maximoUserAccess: MaximoUserAccess

  /**
   * Set maximo user access by site id
   * @param {string} siteId
   * @param {MaximoAccessErrorHandler} errorHandler
   */
  public setMaximoUserAccessBySiteId(
    siteId: string,
    errorHandler?: MaximoAccessErrorHandler
  ): void {
    this.getMaximoUserAccessBySiteId(siteId).subscribe({
      next: (maximoAccess: MaximoUserAccess) => {
        this.maximoUserAccess = maximoAccess
        this.maximoUserAccess$.next({ ...this.maximoUserAccess })
      },
      error: () => {
        if (errorHandler === MaximoAccessErrorTrigger.Toast) {
          const message = this.translocoService.translate(
            'General.MaximoAccessError'
          )
          const warning = new Toast('warning', message)
          this.toastService.addToast(warning)
        }

        this.maximoUserAccess = {
          canReadTickets: false,
          canWriteTickets: false
        }
        this.maximoUserAccess$.next({ ...this.maximoUserAccess })
      }
    })
  }

  /**
   * Get maximo user access by site id
   * @param {string} siteId
   * @returns {Observable<MaximoUserAccess>}
   */
  public getMaximoUserAccessBySiteId(
    siteId: string
  ): Observable<MaximoUserAccess> {
    return this.siteMaximoAccessGQL
      .fetch({ siteId })
      .pipe(map((result) => result.data?.maximoAccess as MaximoUserAccess))
  }

  /**
   * Get maximo user access read and write rights
   */
  public get maximoAccess() {
    return { ...this.maximoUserAccess }
  }

  /**
   * Get maximo user access write right
   */
  public get canWriteTickets() {
    return { ...this.maximoUserAccess }.canWriteTickets
  }

  /**
   * Get maximo user access read right
   */
  public get canReadTickets() {
    return { ...this.maximoUserAccess }.canReadTickets
  }
}
