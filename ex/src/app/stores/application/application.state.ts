import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import applicationActions from './application.actions'
import { Applications } from './interfaces/application.interface'
import { AppState, ApplicationState } from './interfaces/state.interface'

export const initialState: ApplicationState = {
  [Applications.Cases]: {
    enabled: null
  },
  [Applications.Contacts]: {
    enabled: null
  },
  [Applications.Contracts]: {
    enabled: null
  },
  [Applications.DivertHealth]: {
    enabled: null
  },
  [Applications.Documentation]: {
    enabled: null
  },
  [Applications.Home]: {
    enabled: null
  },
  [Applications.PaceInsights]: {
    enabled: null
  },
  [Applications.ProcessInsights]: {
    enabled: null
  },
  [Applications.Settings]: {
    enabled: null
  },
  [Applications.ShuttleHealth]: {
    enabled: null
  },
  [Applications.SpareParts]: {
    enabled: null
  },
  [Applications.System]: {
    enabled: null
  },
  [Applications.Tickets]: {
    enabled: null
  },
  [Applications.Training]: {
    enabled: null
  },
  [Applications.VIAInsights]: {
    enabled: null
  },
  [Applications.VIDI]: {
    enabled: null
  },
  [Applications.WSInsights]: {
    enabled: null
  },
  // site-setting needs to checked and site segment should be warehouse or amazon
  [Applications.WarrantyClaims]: {
    enabled: null
  },
  // SuperUserOrPortalAdminGuard
  [Applications.SiteOverview]: {
    enabled: null
  },
  // not in use
  currentApplication: null
}

export const reducer: ActionReducer<ApplicationState> = createReducer(
  initialState,
  on(applicationActions.updateApplications, (state, update) => ({
    ...state,
    ...update
  })),
  on(applicationActions.updateCurrentApplication, (state, update) => ({
    ...state,
    currentApplication: update.application
  })),
  on(applicationActions.resetCurrentApplication, (state) => ({
    ...state,
    currentApplication: null
  }))
)

export const applicationFeature = createFeature({
  name: 'applications',
  reducer,
  extraSelectors: ({ selectApplicationsState }) => ({
    selectAvailableApplications: createSelector(
      selectApplicationsState,
      (applicationState) =>
        Object.entries(applicationState)
          .filter(
            (entry): entry is [Applications, AppState] =>
              entry[1]?.enabled === true
          )
          .reduce<Partial<Record<Applications, AppState>>>(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value
            }),
            {}
          )
    )
  })
})
