import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import clipboardActions from '@stores/clipboard/clipboard.actions'
import { errorFeature } from '@stores/error/error.state'
import { filter, map } from 'rxjs'
import toastActions from './toast.actions'
import { ToastType } from './toast.state'

export const onError$ = createEffect(
  (store$ = inject(Store)) =>
    store$.select(errorFeature.selectError).pipe(
      filter((error): error is Error => !!error),
      map((error) => {
        return toastActions.addToast({
          toast: {
            id: crypto.randomUUID(),
            messageKey: error.message,
            type: ToastType.Error
          }
        })
      })
    ),
  { functional: true }
)

export const onClipboardSuccess$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(clipboardActions.copyToClipBoardSuccess),
      map(() => {
        return toastActions.addToast({
          toast: {
            id: crypto.randomUUID(),
            messageKey: 'ClipBoard.CopyToClipboard',
            type: ToastType.Success
          }
        })
      })
    ),
  { functional: true }
)
