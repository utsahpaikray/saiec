import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { CurrentUser } from './interfaces/current-user.interface'
import { UserData } from './interfaces/userdata.backend.interface'

export default createActionGroup({
  source: 'CurrentUser',
  events: {
    login: props<{ redirectUrl?: string }>(),
    loginSuccess: emptyProps(),
    loginFailure: props<{ error: Error }>(),
    checkIsAuthenticatedSuccess: props<{
      isAuthenticated: boolean
    }>(),
    checkIsAuthenticatedFailure: props<{ error: Error }>(),
    getCurrentUser: props<{ userData?: UserData }>(),
    getCurrentUserSuccess: props<{ currentUser: CurrentUser }>(),
    getCurrentUserFailure: props<{ error: Error }>(),
    logOff: emptyProps(),
    logOffSuccess: emptyProps(),
    logOffFailure: props<{ error: Error }>()
  }
})
