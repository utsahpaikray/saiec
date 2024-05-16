import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import { MaximoAssetsState } from './interfaces/state.interface'
import maximoActions from './maximo-assets.actions'

const initialState: MaximoAssetsState = {
  assets: null,
  currentAsset: null,
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false
  },
  loading: false,
  error: null
}

export const reducer: ActionReducer<MaximoAssetsState> = createReducer(
  initialState,
  on(maximoActions.getMaximoAssets, (state) => ({
    ...state,
    assets: null,
    loading: true
  })),
  on(maximoActions.getMaximoAssetsSuccess, (state, { assets, pageInfo }) => ({
    ...state,
    assets,
    pageInfo,
    loading: false
  })),
  on(maximoActions.getMaximoAssetsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(maximoActions.getCurrentAsset, (state) => ({
    ...state,
    currentAsset: null,
    loading: true
  })),
  on(maximoActions.getCurrentAssetSuccess, (state, { currentAsset }) => ({
    ...state,
    currentAsset: currentAsset,
    loading: false
  })),
  on(maximoActions.getCurrentAssetFailure, (state, { error }) => ({
    ...state,
    currentAsset: null,
    error,
    loading: false
  }))
)

export const maximoAssetsFeature = createFeature({
  name: 'maximoAssets',
  reducer,
  extraSelectors: ({ selectMaximoAssetsState }) => {
    return {
      selectMaximoAssetsNotLoading: createSelector(
        selectMaximoAssetsState,
        ({ loading, assets }) => (loading ? null : assets)
      ),
      selectCurrentMaximoAssetNotLoading: createSelector(
        selectMaximoAssetsState,
        ({ loading, currentAsset }) => (loading ? null : currentAsset)
      )
    }
  }
})
