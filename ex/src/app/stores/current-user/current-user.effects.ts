import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, filter, map, Observable, of, switchMap } from 'rxjs'
import CurrentUserActions from './current-user.actions'

import { OidcSecurityService } from 'angular-auth-oidc-client'
import { mapCurrentUser } from './current-user.state'
import { UserData } from './interfaces/userdata.backend.interface'
import { Store } from '@ngrx/store'
import { getRouterSelectors } from '@ngrx/router-store'
import currentUserActions from './current-user.actions'

export const login$ = createEffect(
  (
    actions$ = inject(Actions),
    oidcSecurityService = inject(OidcSecurityService)
  ) =>
    actions$.pipe(
      ofType(CurrentUserActions.login),
      map(({ redirectUrl }) => {
        oidcSecurityService.authorize(
          undefined,
          redirectUrl ? { redirectUrl } : undefined
        )
        return CurrentUserActions.loginSuccess()
      }),
      catchError((error) => of(CurrentUserActions.loginFailure({ error })))
    ),
  { functional: true }
)

export const routerNavigationIsLogout$ = createEffect(
  (store = inject(Store)) =>
    store.select(getRouterSelectors().selectRouteData).pipe(
      filter((data) => data?.logout),
      map(() => currentUserActions.logOff())
    ),
  { functional: true }
)

export const isAuthenticated$ = createEffect(
  (oidcSecurityService = inject(OidcSecurityService)) =>
    oidcSecurityService.checkAuth().pipe(
      map(({ isAuthenticated }) =>
        CurrentUserActions.checkIsAuthenticatedSuccess({
          isAuthenticated
        })
      ),
      catchError((error) =>
        of(CurrentUserActions.checkIsAuthenticatedFailure({ error }))
      )
    ),
  { functional: true }
)

export const getCurrentUser$ = createEffect(
  (
    actions$ = inject(Actions),
    oidcSecurityService = inject(OidcSecurityService)
  ) =>
    actions$.pipe(
      ofType(CurrentUserActions.checkIsAuthenticatedSuccess),
      switchMap(
        (): Observable<UserData> =>
          oidcSecurityService.getPayloadFromAccessToken()
      ),
      map((userDataResponse) => mapCurrentUser(userDataResponse)),
      map((currentUser) =>
        CurrentUserActions.getCurrentUserSuccess({
          currentUser
        })
      ),
      catchError((error) =>
        of(CurrentUserActions.getCurrentUserFailure({ error }))
      )
    ),
  { functional: true }
)

export const logOff$ = createEffect(
  (
    actions$ = inject(Actions),
    oidcSecurityService = inject(OidcSecurityService)
  ) =>
    actions$.pipe(
      ofType(CurrentUserActions.logOff),
      switchMap(() => {
        return oidcSecurityService.logoff().pipe(
          map(() => CurrentUserActions.logOffSuccess()),
          catchError((error) => of(CurrentUserActions.logOffFailure({ error })))
        )
      })
    ),
  { functional: true }
)
