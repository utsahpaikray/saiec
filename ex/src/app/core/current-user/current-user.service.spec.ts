import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthModule, LogLevel } from 'angular-auth-oidc-client'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'

import {
  Portal,
  IdentityUser,
  Site,
  RelatedPortalData,
  UserType
} from '@core/generated/types'
import { CurrentUserService } from './current-user.service'
import { Roles } from '@core/interfaces/roles.enum'

const MockUser: IdentityUser = {
  email: 'test@test.com',
  id: 'testId',
  relatedPortalData: {
    sites: [] as Site[],
    portals: [] as Portal[]
  } as RelatedPortalData,
  roles: [],
  assignableRoles: [],
  language: 'nl-nl',
  username: 'User',
  userType: UserType.Employee
}

describe('CurrentUserService', () => {
  let service: CurrentUserService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        AuthModule.forRoot({
          config: {
            authority: 'https://keycloak-dev.evimvi.nl/auth/realms/dsf',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'portal-app',
            scope: 'openid offline_access',
            responseType: 'code',
            autoUserInfo: true,
            silentRenew: true,
            useRefreshToken: true,
            logLevel: LogLevel.Debug,
            ignoreNonceAfterRefresh: true
          }
        })
      ],
      providers: [CurrentUserService]
    }).compileComponents()
    service = TestBed.inject(CurrentUserService)
  })

  it('provides user data observable', () => {
    expect(service.userData$).toBeDefined()
  })

  describe('isSuperUser', () => {
    it('should be false if no roles', () => {
      service.roles = []

      expect(service.isSuperUser).toBe(false)
    })

    it('should be false if not a super user role', () => {
      service.roles = [Roles.PortalAdmin, Roles.User, Roles.VanderlandeUser]

      expect(service.isSuperUser).toBe(false)
    })

    it('should be true if has a super user role', () => {
      service.roles = [Roles.SuperUser]

      expect(service.isSuperUser).toBe(true)
    })
  })

  describe('isPortalAdmin', () => {
    it('should be false if no roles', () => {
      service.roles = []

      expect(service.isPortalAdmin).toBe(false)
    })

    it('should be false if not a portal admin role', () => {
      service.roles = [Roles.SuperUser, Roles.User, Roles.VanderlandeUser]

      expect(service.isPortalAdmin).toBe(false)
    })

    it('should be true if has a portal admin role', () => {
      service.roles = [Roles.PortalAdmin]

      expect(service.isPortalAdmin).toBe(true)
    })
  })

  describe('isVanderlandeUser', () => {
    it('should be false if no roles', () => {
      service.roles = []

      expect(service.isVanderlandeUser).toBe(false)
    })

    it('should be false if not a vanderlande user role', () => {
      service.roles = [Roles.SuperUser, Roles.User, Roles.PortalAdmin]

      expect(service.isVanderlandeUser).toBe(false)
    })

    it('should be true if has a vanderlande user role', () => {
      service.roles = [Roles.VanderlandeUser]

      expect(service.isVanderlandeUser).toBe(true)
    })
  })

  describe('isCustomerUser', () => {
    it('should be false if no roles', () => {
      service.roles = []

      expect(service.isCustomerUser).toBe(false)
    })

    it('should be false if not a customer role', () => {
      service.roles = [
        Roles.PortalAdmin,
        Roles.SuperUser,
        Roles.VanderlandeUser
      ]

      expect(service.isCustomerUser).toBe(false)
    })

    it('should be true if has a customer role', () => {
      service.roles = [Roles.User]

      expect(service.isCustomerUser).toBe(true)
    })
  })

  describe('hasAccessToPortalOverview', () => {
    it('should be false if no roles', () => {
      service.roles = []
      service.userData$ = of({ roles: [], id: '', me: MockUser })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(false)
        }
      )
    })

    it('should be true if super user', () => {
      service.roles = [Roles.PortalAdmin, Roles.SuperUser]
      service.userData$ = of({
        roles: [Roles.PortalAdmin, Roles.SuperUser],
        id: '',
        me: MockUser
      })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(true)
        }
      )
    })

    it('should be false if portal admin with only one portal', () => {
      service.roles = [Roles.PortalAdmin]
      service.userData$ = of({
        roles: [Roles.PortalAdmin],
        id: '',
        me: {
          ...MockUser,
          relatedPortalData: {
            ...MockUser.relatedPortalData,
            portals: [{ id: 'portal1' } as Portal]
          }
        } as IdentityUser
      })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(false)
        }
      )
    })

    it('should be true if portal admin with muliple portals', () => {
      service.roles = [Roles.PortalAdmin]
      service.userData$ = of({
        roles: [Roles.PortalAdmin],
        id: '',
        me: {
          ...MockUser,
          relatedPortalData: {
            ...MockUser.relatedPortalData,
            portals: [{ id: 'portal1' } as Portal, { id: 'portal2' } as Portal]
          }
        } as IdentityUser
      })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(true)
        }
      )
    })

    it('should be false if vanderlande user with only one portal', () => {
      service.roles = [Roles.VanderlandeUser]
      service.userData$ = of({
        roles: [Roles.VanderlandeUser],
        id: '',
        me: {
          ...MockUser,
          relatedPortalData: {
            ...MockUser.relatedPortalData,
            portals: [{ id: 'portal1' } as Portal]
          }
        } as IdentityUser
      })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(false)
        }
      )
    })

    it('should be true if vanderlande user with muliple portals', () => {
      service.roles = [Roles.VanderlandeUser]
      service.userData$ = of({
        roles: [Roles.VanderlandeUser],
        id: '',
        me: {
          ...MockUser,
          relatedPortalData: {
            ...MockUser.relatedPortalData,
            portals: [{ id: 'portal1' } as Portal, { id: 'portal2' } as Portal]
          }
        } as IdentityUser
      })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(true)
        }
      )
    })

    it('should be false if customer user role', () => {
      service.roles = [Roles.User]
      service.userData$ = of({
        roles: [Roles.User],
        id: '',
        me: MockUser
      })

      service.hasAccessToPortalOverview$.subscribe(
        (hasAccessToPortalOverview) => {
          expect(hasAccessToPortalOverview).toBe(false)
        }
      )
    })
  })
})
