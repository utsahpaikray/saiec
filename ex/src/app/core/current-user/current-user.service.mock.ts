import { Observable, of } from 'rxjs'
import { Portal, IdentityUser, Site } from '@core/generated/types'
import { UserData } from '@core/interfaces/user-data.interface'

export class CurrentUserServiceMock {
  userData$: Observable<UserData> = of({
    roles: [],
    id: 'userId',
    me: {
      id: 'portalUserId',
      relatedPortalData: {
        portals: [] as Portal[],
        sites: [] as Site[]
      }
    } as IdentityUser
  })

  public get isSuperUser(): boolean {
    return true
  }

  public get isPortalAdmin(): boolean {
    return false
  }

  public get isCustomerUser(): boolean {
    return false
  }

  public get hasAccessToPortalOverview$(): Observable<boolean> {
    return of(true)
  }

  public get userPortals$(): Observable<Portal[]> {
    return of([])
  }

  public get userSites$(): Observable<Site[]> {
    return of([])
  }
}
