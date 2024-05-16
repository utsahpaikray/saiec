import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import clipboardActions from './clipboard.actions'

export const copyToClipboard$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(clipboardActions.copyToClipBoard),
      switchMap(({ text }) => navigator.clipboard.writeText(text)),
      map(() => {
        return clipboardActions.copyToClipBoardSuccess()
      }),
      catchError((error) =>
        of(clipboardActions.copyToClipBoardFailure({ error }))
      )
    ),
  { functional: true }
)
