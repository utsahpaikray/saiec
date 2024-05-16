import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import { SitesState } from './interfaces/state.interface'
import SitesActions from './sites.actions'

const initialState: SitesState = {
  sites: null,
  loading: false,
  error: null
}

const reducer: ActionReducer<SitesState> = createReducer(
  initialState,
  on(SitesActions.getSitesByPortalId, () => ({
    sites: null,
    loading: true,
    error: null
  })),
  on(SitesActions.getSitesByPortalIdSuccess, (state, action) => ({
    ...state,
    sites: action.sites,
    loading: false
  })),
  on(SitesActions.getSitesByPortalIdFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(SitesActions.resetSites, (state) => ({
    ...state,
    sites: null
  }))
)
export const sitesFeature = createFeature({
  name: 'sites',
  reducer,
  extraSelectors: ({ selectSitesState }) => ({
    selectSitesNotLoading: createSelector(
      selectSitesState,
      ({ sites, loading }) => (loading ? null : sites)
    )
  })
})
