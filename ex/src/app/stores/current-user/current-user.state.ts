import * as Types from '@core/generated/types'
import { localeList } from '@core/locale/locale-list'
import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import CurrentUserActions from './current-user.actions'
import { CurrentUser, UserType } from './interfaces/current-user.interface'
import { CurrentUserState } from './interfaces/state.interface'
import {
  ResourceAccess,
  UserData
} from './interfaces/userdata.backend.interface'

export const initialState: CurrentUserState = {
  loading: true,
  isAuthenticated: null,
  currentUser: null,
  error: null
}

export const mapCurrentUser = (userData: UserData): CurrentUser => {
  const { email, name, resource_access, user_type } = userData
  return {
    id: userData.sub,
    email: email ?? undefined,
    name: name ?? undefined,
    roles: resource_access[ResourceAccess.PortalApp].roles.map((role) => role),
    username: '',
    userType:
      user_type === Types.UserType.Employee
        ? UserType.Employee
        : UserType.Customer
  }
}

export const reducer: ActionReducer<CurrentUserState> = createReducer(
  initialState,
  on(
    CurrentUserActions.checkIsAuthenticatedSuccess,
    (state, { isAuthenticated }) => ({
      ...state,
      isAuthenticated
    })
  ),
  on(CurrentUserActions.checkIsAuthenticatedFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    error,
    loading: false,
    isAuthenticated: false
  })),
  on(CurrentUserActions.getCurrentUser, (state) => ({
    ...state,
    loading: true
  })),
  on(CurrentUserActions.getCurrentUserSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser,
    loading: false // this flag help the auth guard to know, isAuthenticated is ready for use
  })),
  on(CurrentUserActions.getCurrentUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false // this flag help the auth guard to know, isAuthenticated is ready for use
  }))
)

export const currentUserFeature = createFeature({
  name: 'currentUser',
  reducer,
  extraSelectors: ({
    selectCurrentUser,
    selectIsAuthenticated,
    selectLoading
  }) => {
    const hasRoleFactory =
      (desiredRoleName: string) => (currentUser: CurrentUser | null) =>
        currentUser?.roles?.some((role) => role === desiredRoleName) || false
    const roleBasedSelectorFactory = (desiredRoleName: string) =>
      createSelector(selectCurrentUser, hasRoleFactory(desiredRoleName))
    const isSuperUser = roleBasedSelectorFactory('SuperUser')
    const isPortalAdmin = roleBasedSelectorFactory('PortalAdmin')
    const isCustomerUser = roleBasedSelectorFactory('User')
    const isVanderlandeUser = roleBasedSelectorFactory('VanderlandeUser')
    return {
      isSuperUser,
      isPortalAdmin,
      isCustomerUser,
      isVanderlandeUser,
      isEmployee: createSelector(
        selectCurrentUser,
        (currentUser) => currentUser?.userType === UserType.Employee
      ),
      isSuperUserOrPortalAdmin: createSelector(
        isSuperUser,
        isPortalAdmin,
        (superUser, portalAdmin) => superUser || portalAdmin
      ),
      selectUserLanguage: createSelector(
        selectCurrentUser,
        (currentUser) => currentUser?.language || localeList[0].code
      ),
      isAuthenticated: createSelector(
        selectIsAuthenticated,
        selectLoading,
        (isAuthenticated, loading) => (!loading ? isAuthenticated : null)
      ),
      selectUserFullName: createSelector(
        selectCurrentUser,
        (currentUser) => currentUser?.name
      ),
      selectCurrentUserId: createSelector(
        selectCurrentUser,
        (currentUser) => currentUser?.id
      )
    }
  }
})
