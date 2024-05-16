import { ActionReducer, createFeature, createReducer, on } from '@ngrx/store'
import recentlyUsedActions from './recently-used.actions'

export interface RecentlyUsedState {
  recentlyUsedPortalIds: string[]
  recentlyUsedSiteIds: string[]
  maxRecentlyUsedSiteIds: number
  maxRecentlyUsedPortalIds: number
}

const initialState: RecentlyUsedState = {
  recentlyUsedPortalIds: [],
  recentlyUsedSiteIds: [],
  maxRecentlyUsedSiteIds: 3,
  maxRecentlyUsedPortalIds: 3
}

const saveState = (state: RecentlyUsedState): RecentlyUsedState => {
  localStorage.setItem('recentlyUsed', JSON.stringify(state))
  return state
}

const loadState = (fallback: RecentlyUsedState): RecentlyUsedState => {
  const state = localStorage.getItem('recentlyUsed')
  if (!state) {
    return fallback
  }
  try {
    return JSON.parse(state) || fallback
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error loading state:', e)
  }
  return fallback
}

export const reducer: ActionReducer<RecentlyUsedState> = createReducer(
  loadState(initialState),
  on(recentlyUsedActions.setRecentlyUsedPortal, (state, { portalId }) =>
    saveState({
      ...state,
      recentlyUsedPortalIds: [
        portalId,
        ...state.recentlyUsedPortalIds.filter((id) => id !== portalId)
      ].slice(0, state.maxRecentlyUsedPortalIds)
    })
  ),
  on(recentlyUsedActions.setRecentlyUsedSite, (state, { siteId }) =>
    saveState({
      ...state,
      recentlyUsedSiteIds: [
        siteId,
        ...state.recentlyUsedSiteIds.filter((id) => id !== siteId)
      ].slice(0, state.maxRecentlyUsedSiteIds)
    })
  )
)

export const recentlyUsedFeature = createFeature({
  name: 'recently-used',
  reducer
})
