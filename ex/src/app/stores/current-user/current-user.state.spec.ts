import { TestBed } from '@angular/core/testing'
import { localeList } from '@core/locale/locale-list'
import { Actions } from '@ngrx/effects'
import { provideMockActions } from '@ngrx/effects/testing'
import CurrentUserActions from './current-user.actions'
import { currentUserFeature, reducer } from './current-user.state'
import { CurrentUser, UserType } from './interfaces/current-user.interface'

const initialState = {
  loading: true,
  isAuthenticated: null,
  currentUser: null,
  error: null
}

const mockDataCurrentUser: CurrentUser[] = [
  {
    id: 'testId1',
    roles: ['SuperUser'],
    username: 'testUser1',
    userType: UserType.Employee,
    email: 'test1@test.com',
    name: 'test1 user',
    language: 'en'
  },
  {
    id: 'testId2',
    roles: ['PortalAdmin'],
    username: 'testUser2',
    userType: UserType.Employee,
    email: 'test2@test.com',
    name: 'test2 user',
    language: 'fr'
  },
  {
    id: 'testId3',
    roles: ['VanderlandeUser'],
    username: 'testUser3',
    userType: UserType.Employee,
    email: 'test3@test.com',
    name: 'test3 user',
    language: 'ru'
  },
  {
    id: 'testId4',
    roles: ['User'],
    username: 'testUser4',
    userType: UserType.Customer,
    email: 'test4@test.com',
    name: 'test4 user'
  }
]

describe('CurrentUserState', () => {
  let action: Actions
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => action)]
    })
  })

  describe('Reducers', () => {
    it('action checkIsAuthenticatedSuccess updates the isAuthenticated state', () => {
      const isAuthenticated = true
      const state = reducer(
        initialState,
        CurrentUserActions.checkIsAuthenticatedSuccess({
          isAuthenticated
        })
      )

      expect(state).toEqual({
        ...initialState,
        isAuthenticated: true
      })
    })

    it('action getCurrentUserSuccess updates the currentUser and loading state', () => {
      const loading = false
      const currentUser = mockDataCurrentUser[0]
      const state = reducer(
        initialState,
        CurrentUserActions.getCurrentUserSuccess({ currentUser })
      )

      expect(state).toEqual({
        ...initialState,
        currentUser: currentUser,
        loading: loading
      })
    })

    it('action getCurrentUserFailure updates the error and loading state', () => {
      const loading = false
      const error = new Error()
      const state = reducer(
        initialState,
        CurrentUserActions.getCurrentUserFailure({ error })
      )

      expect(state).toEqual({
        ...initialState,
        error: error,
        loading: loading
      })
    })
  })

  describe('Selectors', () => {
    it('isSuperUser returns true if the current user has the SuperUser role', () => {
      const superUser = mockDataCurrentUser[0]

      const isSuperUser = currentUserFeature.isSuperUser.projector(superUser)

      expect(isSuperUser).toBe(true)
    })

    it('isSuperUser returns false if the current user does not have the SuperUser role', () => {
      const nonSuperUser = mockDataCurrentUser[1]

      const isSuperUser = currentUserFeature.isSuperUser.projector(nonSuperUser)

      expect(isSuperUser).toBe(false)
    })

    it('isPortalAdmin returns true if the current user has the PortalAdmin role', () => {
      const portalAdmin = mockDataCurrentUser[1]

      const isPortalAdmin =
        currentUserFeature.isPortalAdmin.projector(portalAdmin)

      expect(isPortalAdmin).toBe(true)
    })

    it('isPortalAdmin returns false if the current user does not have the PortalAdmin role', () => {
      const nonPortalAdmin = mockDataCurrentUser[2]

      const isPortalAdmin =
        currentUserFeature.isPortalAdmin.projector(nonPortalAdmin)

      expect(isPortalAdmin).toBe(false)
    })

    it('isCustomerUser returns true if the current user has the CustomerUser role', () => {
      const customerUser = mockDataCurrentUser[3]

      const isCustomerUser =
        currentUserFeature.isCustomerUser.projector(customerUser)

      expect(isCustomerUser).toBe(true)
    })

    it('isCustomerUser returns false if the current user does not have the CustomerUser role', () => {
      const nonCustomerUser = mockDataCurrentUser[0]

      const isCustomerUser =
        currentUserFeature.isCustomerUser.projector(nonCustomerUser)

      expect(isCustomerUser).toBe(false)
    })

    it('isVanderlandeUser returns true if the current user has the VanderlandeUser role', () => {
      const vanderlandeUser = mockDataCurrentUser[2]

      const isVanderlandeUser =
        currentUserFeature.isVanderlandeUser.projector(vanderlandeUser)

      expect(isVanderlandeUser).toBe(true)
    })

    it('isVanderlandeUser returns false if the current user does not have the VanderlandeUser role', () => {
      const nonVanderlandeUser = mockDataCurrentUser[3]

      const isVanderlandeUser =
        currentUserFeature.isVanderlandeUser.projector(nonVanderlandeUser)

      expect(isVanderlandeUser).toBe(false)
    })

    it('isEmployee returns true if the current user has the Employee role', () => {
      const employee = mockDataCurrentUser[0]

      const isEmployee = currentUserFeature.isEmployee.projector(employee)

      expect(isEmployee).toBe(true)
    })

    it('isEmployee returns false if the current user does not have the Employee role', () => {
      const nonEmployee = mockDataCurrentUser[3]

      const isEmployee = currentUserFeature.isEmployee.projector(nonEmployee)

      expect(isEmployee).toBe(false)
    })

    it('userLanguage returns the current user language', () => {
      const userLanguage = currentUserFeature.selectUserLanguage.projector(
        mockDataCurrentUser[0]
      )

      const language = <string>mockDataCurrentUser[0].language

      expect(userLanguage).toEqual(language)
    })

    it('return fallback language if the current user language not exists/available', () => {
      const userLanguage = currentUserFeature.selectUserLanguage.projector(
        mockDataCurrentUser[4]
      )

      const fallbackLanguage = localeList[0].code

      const language = <string>mockDataCurrentUser[1].language //fr

      expect(userLanguage).not.toEqual(language)
      expect(userLanguage).toEqual(fallbackLanguage)
    })
  })
})
