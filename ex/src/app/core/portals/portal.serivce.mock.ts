import { Observable, of } from 'rxjs'
import { Portal } from '../generated/types'

export class PortalServiceMock {
  getPortals(): Observable<any> {
    return of([
      {
        id: 'portalId',
        name: 'portal name'
      } as Portal,
      {
        id: 'anotherPortalId',
        name: 'anotherPortalName'
      } as Portal
    ])
  }

  getPortalById(portalId: string): Observable<any> {
    return of({ id: portalId })
  }
}
