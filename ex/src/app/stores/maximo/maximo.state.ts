import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import { MaximoState } from './interfaces/state.interface'
import maximoActions from './maximo.actions'

const initialState: MaximoState = {
  maximoAccess: null,
  loading: false,
  error: null
}

export const reducer: ActionReducer<MaximoState> = createReducer(
  initialState,
  on(maximoActions.getMaximoAccess, (state) => ({
    ...state,
    maximoAccess: null,
    loading: true
  })),
  on(maximoActions.getMaximoAccessSuccess, (state, { maximoAccess }) => ({
    ...state,
    maximoAccess,
    loading: false
  })),
  on(maximoActions.getMaximoAccessFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
)

export const maximoFeature = createFeature({
  name: 'maximo',
  reducer,
  extraSelectors: ({ selectMaximoAccess, selectLoading }) => {
    return {
      hasReadAccess: createSelector(
        selectMaximoAccess,
        (maximoAccess) => maximoAccess?.readAccess
      ),
      hasWriteAccess: createSelector(
        selectMaximoAccess,
        (maximoAccess) => maximoAccess?.writeAccess
      ),
      hasReadAccessNotLoading: createSelector(
        selectMaximoAccess,
        selectLoading,
        (maximoAccess, loading) =>
          loading ? null : maximoAccess?.readAccess ?? null
      ),
      hasWriteAccessNotLoading: createSelector(
        selectMaximoAccess,
        selectLoading,
        (maximoAccess, loading) =>
          loading ? null : maximoAccess?.writeAccess ?? null
      )
    }
  }
})
