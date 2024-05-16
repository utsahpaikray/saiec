import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import toastActions from './toast.actions'

export enum ToastType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export interface Toast {
  id: string
  messageKey: string
  type: ToastType
  TTL?: number
}

export interface ToastState {
  toasts: Toast[]
}

export const initialState: ToastState = {
  toasts: []
}

export const DEFAULT_TTL = 5000

export const reducer: ActionReducer<ToastState> = createReducer(
  initialState,
  on(toastActions.addToast, (state, { toast }) => ({
    ...state,
    toasts: [...state.toasts, toast]
  })),
  on(toastActions.removeToast, (state, { id }) => ({
    ...state,
    toasts: state.toasts.filter((toast) => toast.id !== id)
  }))
)

export const toastFeature = createFeature({
  name: 'toast',
  reducer,
  extraSelectors: ({ selectToastState }) => ({
    selectFirstToast: createSelector(
      selectToastState,
      ({ toasts }): Toast | null => toasts[0] ?? null
    )
  })
})
