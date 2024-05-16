import { TestBed } from '@angular/core/testing'
import { CurrentUserGQL } from '@core/current-user/graphql/current-user.graphql-gen'
import { provideMockActions } from '@ngrx/effects/testing'
import { Action } from '@ngrx/store'
import { OidcSecurityService } from 'angular-auth-oidc-client'
import { firstValueFrom, Observable, of, throwError } from 'rxjs'
import currentUserActions from './current-user.actions'
import {
  getCurrentUser$,
  isAuthenticated$,
  login$,
  logOff$
} from './current-user.effects'
import { mapCurrentUser } from './current-user.state'
import { UserData } from './interfaces/userdata.backend.interface'

const mockUserData: UserData[] = [
  {
    sub: '1',
    email_verified: true,
    role: ['SuperUser'],
    name: 'test1 user',
    preferred_username: 'bob1',
    given_name: 'test1',
    family_name: 'user',
    email: 'test@test.com',
    user_type: 'employee',
    resource_access: {
      'portal-app': {
        roles: ['SuperUser']
      }
    }
  },
  {
    sub: '2',
    email_verified: false,
    role: ['PortalAdmin'],
    name: 'test2 user',
    preferred_username: 'bob2',
    given_name: 'test2',
    family_name: 'user',
    email: 'test@test.com',
    user_type: 'employee',
    resource_access: {
      'portal-app': {
        roles: ['PortalAdmin']
      }
    }
  },
  {
    sub: '3',
    email_verified: true,
    role: ['VanderlandeUser'],
    name: 'test3 user',
    preferred_username: 'bob3',
    given_name: 'test3',
    family_name: 'user',
    email: 'test@test.com',
    user_type: 'employee',
    resource_access: {
      'portal-app': {
        roles: ['VanderlandeUser']
      }
    }
  },
  {
    sub: '4',
    email_verified: true,
    role: ['User'],
    name: 'test4 user',
    preferred_username: 'bob4',
    given_name: 'test4',
    family_name: 'user',
    email: 'test@test.com',
    user_type: 'customer',
    resource_access: {
      'portal-app': {
        roles: ['User']
      }
    }
  }
]

describe('current-user.effect', () => {
  let action$: Observable<Action>
  let oidcSecurityService: jasmine.SpyObj<OidcSecurityService>
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: OidcSecurityService,
          useValue: jasmine.createSpyObj('OidcSecurityService', [
            'authorize',
            'checkAuth',
            'logoff',
            'getPayloadFromAccessToken'
          ])
        },
        {
          provide: CurrentUserGQL,
          useValue: jasmine.createSpyObj('CurrentUserGQL', ['fetch'])
        },
        provideMockActions(() => action$)
      ]
    })
    action$ = new Observable()
    oidcSecurityService = TestBed.inject(
      OidcSecurityService
    ) as jasmine.SpyObj<OidcSecurityService>
  })

  describe('login$', () => {
    it('login success ', async () => {
      oidcSecurityService.authorize.and.stub()
      action$ = of(currentUserActions.login({}))

      const effect = await firstValueFrom(login$(action$, oidcSecurityService))

      expect(effect.type).toEqual(currentUserActions.loginSuccess().type)
    })

    it('login failed ', async () => {
      const error = new Error('error')
      oidcSecurityService.authorize.and.throwError(error)
      action$ = of(currentUserActions.login({}))

      const effect = await firstValueFrom(login$(action$, oidcSecurityService))

      expect(effect).toEqual(currentUserActions.loginFailure({ error }))
    })
  })

  describe('logoff$', () => {
    it('logoff success', async () => {
      oidcSecurityService.logoff.and.returnValue(of(null))
      action$ = of(currentUserActions.logOff)

      const logOffEffect = await firstValueFrom(
        logOff$(action$, oidcSecurityService)
      )

      expect(logOffEffect.type).toEqual(currentUserActions.logOffSuccess().type)
    })

    it('logoff failed', async () => {
      const error = new Error('error')

      oidcSecurityService.logoff.and.returnValue(throwError(() => error))
      action$ = of(currentUserActions.logOff())

      const logOffEffect = await firstValueFrom(
        logOff$(action$, oidcSecurityService)
      )

      expect(logOffEffect).toEqual(currentUserActions.logOffFailure({ error }))
    })
  })

  describe('isAuthenticated$', () => {
    it('isAuthenticated success ', async () => {
      const loginResponse = {
        isAuthenticated: true,
        userData: null,
        accessToken: '',
        idToken: ''
      }
      oidcSecurityService.checkAuth.and.returnValue(of(loginResponse))

      const effect = await firstValueFrom(isAuthenticated$(oidcSecurityService))

      expect(effect.type).toEqual(
        currentUserActions.checkIsAuthenticatedSuccess({
          isAuthenticated: true
        }).type
      )
    })

    it('not authenticated ', async () => {
      const loginResponse = {
        isAuthenticated: false,
        userData: undefined,
        accessToken: '',
        idToken: '',
        errorMessage: 'error'
      }
      oidcSecurityService.checkAuth.and.returnValue(of(loginResponse))

      const effect = await firstValueFrom(isAuthenticated$(oidcSecurityService))

      expect(effect).toEqual(
        currentUserActions.checkIsAuthenticatedSuccess({
          isAuthenticated: false
        })
      )
    })

    it('should return failure action if oidcSecurityService having error', async () => {
      const error = new Error('error')
      oidcSecurityService.checkAuth.and.returnValue(throwError(() => error))

      const effect = await firstValueFrom(isAuthenticated$(oidcSecurityService))

      expect(effect).toEqual(
        currentUserActions.checkIsAuthenticatedFailure({ error })
      )
    })
  })

  describe('getCurrentUser$', () => {
    it('should fetch current user information if its superuser', async () => {
      // effect input prep
      action$ = of(currentUserActions.checkIsAuthenticatedSuccess)
      oidcSecurityService.getPayloadFromAccessToken.and.returnValue(
        of(mockUserData[0])
      )

      // calling effect
      const effect = await firstValueFrom(
        getCurrentUser$(action$, oidcSecurityService)
      )

      // truthy flow test
      expect(effect).toEqual(
        currentUserActions.getCurrentUserSuccess({
          currentUser: mapCurrentUser(mockUserData[0])
        })
      )

      // falsy flow test
      expect(effect).not.toEqual(
        currentUserActions.getCurrentUserSuccess({
          currentUser: mapCurrentUser(mockUserData[1])
        })
      )
    })

    it('should fetch current user information if its portal admin', async () => {
      // effect input prep
      action$ = of(currentUserActions.checkIsAuthenticatedSuccess)
      oidcSecurityService.getPayloadFromAccessToken.and.returnValue(
        of(mockUserData[1])
      )

      // calling effect
      const effect = await firstValueFrom(
        getCurrentUser$(action$, oidcSecurityService)
      )

      // truthy flow test
      expect(effect).toEqual(
        currentUserActions.getCurrentUserSuccess({
          currentUser: mapCurrentUser(mockUserData[1])
        })
      )

      // falsy flow test
      expect(effect).not.toEqual(
        currentUserActions.getCurrentUserSuccess({
          currentUser: mapCurrentUser(mockUserData[0])
        })
      )
    })

    it('should fetch current user information if its current user', async () => {
      // effect input prep
      action$ = of(currentUserActions.checkIsAuthenticatedSuccess)
      oidcSecurityService.getPayloadFromAccessToken.and.returnValue(
        of(mockUserData[3])
      )

      // calling effect
      const effect = await firstValueFrom(
        getCurrentUser$(action$, oidcSecurityService)
      )

      // truthy flow test
      expect(effect).toEqual(
        currentUserActions.getCurrentUserSuccess({
          currentUser: mapCurrentUser(mockUserData[3])
        })
      )

      // falsy flow test
      expect(effect).not.toEqual(
        currentUserActions.getCurrentUserSuccess({
          currentUser: mapCurrentUser(mockUserData[0])
        })
      )
    })

    it('should return failure action if getCurrentUser fails when oidcSecurityService have error', async () => {
      // effect input prep
      action$ = of(currentUserActions.checkIsAuthenticatedSuccess)

      const error = new Error('error')
      oidcSecurityService.getPayloadFromAccessToken.and.returnValue(
        throwError(() => error)
      )

      // calling effect
      const effect = await firstValueFrom(
        getCurrentUser$(action$, oidcSecurityService)
      )

      expect(effect).toEqual(
        currentUserActions.getCurrentUserFailure({ error })
      )
    })
  })
})
