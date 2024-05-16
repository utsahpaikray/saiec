import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import { SiteDetailState } from './interfaces/state.interface'
import SiteDetailActions from './site-detail.actions'
import { WorkOrderPromotionRule } from '@core/generated/types'

const initialState: SiteDetailState = {
  site: null,
  loading: false,
  error: null
}

const reducer: ActionReducer<SiteDetailState> = createReducer(
  initialState,
  on(SiteDetailActions.getSiteDetails, () => ({
    site: null,
    loading: true,
    error: null
  })),
  on(SiteDetailActions.getSiteDetailsSuccess, (state, action) => ({
    ...state,
    site: action.site,
    loading: false
  })),
  on(SiteDetailActions.getSiteDetailsFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(SiteDetailActions.reset, () => ({
    site: null,
    loading: false,
    error: null
  }))
)

export const siteDetailFeature = createFeature({
  name: 'siteDetail',
  reducer,
  extraSelectors: ({ selectSiteDetailState }) => ({
    selectSiteNotLoading: createSelector(selectSiteDetailState, (state) => {
      if (state && state.loading === false) {
        return state.site
      }
      return null
    }),
    selectSiteId: createSelector(
      selectSiteDetailState,
      (state) => state?.site?.id ?? null
    ),
    selectSegments: createSelector(
      selectSiteDetailState,
      (state) => state?.site?.projects.map((project) => project.segment) ?? null
    ),
    selectIsManualCasesEnabled: createSelector(
      selectSiteDetailState,
      (state) =>
        state?.site
          ? Object.values(state.site.configs.cases).some(
              (value) => value === WorkOrderPromotionRule.Manual
            )
          : null
    ),
    selectSiteSettingConfig: createSelector(
      selectSiteDetailState,
      (state) => state?.site?.configs ?? null
    ),
    selectSourceId: createSelector(
      selectSiteDetailState,
      (state) => state?.site?.sourceId ?? null
    )
  })
})
