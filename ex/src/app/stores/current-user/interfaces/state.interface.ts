import { CurrentUser } from './current-user.interface'

export interface CurrentUserState {
  loading: boolean
  isAuthenticated: boolean | null
  currentUser: CurrentUser | null
  error: Error | null
}
