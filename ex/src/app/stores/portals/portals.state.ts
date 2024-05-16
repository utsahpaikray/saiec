import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import { Portal } from './interfaces/portal.interface'
import { PortalsState } from './interfaces/state.interface'
import PortalsActions from './portals.actions'

export const mapPortals = <T extends Portal>(
  portals: T[] | undefined
): Portal[] | null =>
  portals?.map((portal) => ({ id: portal.id, name: portal.name })) || null

const initialState: PortalsState = {
  myPortals: { portals: [], loading: false, error: null },
  userPortals: { userId: '', portals: [], loading: false, error: null },
  currentPortal: null,
  portalsLoaded: false
}

export const reducer: ActionReducer<PortalsState> = createReducer(
  initialState,
  on(PortalsActions.getMyPortals, (state) => ({
    ...state,
    myPortals: {
      ...state.myPortals,
      loading: true
    }
  })),
  on(PortalsActions.getMyPortalsSuccess, (state, myPortals) => ({
    ...state,
    myPortals: {
      ...state.myPortals,
      portals: myPortals.portals,
      loading: false
    },
    portalsLoaded: true
  })),
  on(PortalsActions.getMyPortalsFailure, (state, myPortals) => ({
    ...state,
    myPortals: {
      ...state.myPortals,
      error: myPortals.error,
      loading: false
    },
    portalsLoaded: true
  })),
  on(PortalsActions.getCurrentPortalSuccess, (state, currentPortal) => ({
    ...state,
    currentPortal: currentPortal.portal
  })),
  on(PortalsActions.getCurrentPortalFailure, (state) => ({
    ...state,
    currentPortal: null
  })),
  on(PortalsActions.fetchCurrentPortalSuccess, (state, currentPortal) => ({
    ...state,
    currentPortal: currentPortal.portal
  })),
  on(PortalsActions.fetchCurrentPortalFailure, (state) => ({
    ...state,
    currentPortal: null
  })),
  on(
    PortalsActions.getCurrentPortalBySiteIdSuccess,
    (state, currentPortal) => ({
      ...state,
      currentPortal: currentPortal.portal
    })
  ),
  on(PortalsActions.getCurrentPortalBySiteIdFailure, (state) => ({
    ...state,
    currentPortal: null
  })),
  on(PortalsActions.resetCurrentPortal, (state) => ({
    ...state,
    currentPortal: null
  })),
  on(PortalsActions.getUserPortals, (state) => ({
    ...state,
    userPortals: {
      ...state.userPortals,
      loading: true
    }
  })),
  on(PortalsActions.getUserPortalsSuccess, (state, userPortals) => ({
    ...state,
    userPortals: {
      ...state.userPortals,
      portals: userPortals.portals,
      loading: false
    },
    portalsLoaded: true
  })),
  on(PortalsActions.getUserPortalsFailure, (state, userPortals) => ({
    ...state,
    userPortals: {
      ...state.userPortals,
      error: userPortals.error,
      loading: false
    },
    portalsLoaded: true
  }))
)

export const portalsFeature = createFeature({
  name: 'portals',
  reducer,
  extraSelectors: ({ selectMyPortals, selectCurrentPortal }) => ({
    selectMyPortalsNotLoading: createSelector(
      selectMyPortals,
      ({ portals, loading }) => (loading ? null : portals)
    ),
    selectCurrentPortalId: createSelector(
      selectCurrentPortal,
      (currentPortal) => currentPortal?.id
    )
  })
})
