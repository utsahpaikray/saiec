import { createFeature, createReducer, on } from '@ngrx/store'
import clipboardActions from '@stores/clipboard/clipboard.actions'
import maximoAssetsActions from '@stores/maximo-assets/maximo-assets.actions'

export interface ErrorStoreState {
  error: Error | null
}

const initialState: ErrorStoreState = {
  error: null
}

export const reducer = createReducer<ErrorStoreState>(
  initialState,
  on(clipboardActions.copyToClipBoardFailure, (_state, { error }) => ({
    error
  })),
  on(maximoAssetsActions.getMaximoAssetsFailure, (_state, { error }) => ({
    error
  })),
  on(maximoAssetsActions.getCurrentAssetFailure, (_state, { error }) => ({
    error
  }))
)

export const errorFeature = createFeature({
  name: 'error',
  reducer
})
