import {
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on
} from '@ngrx/store'
import casesActions from './cases.actions'
import { CasesState } from './interfaces/state.interface'

const initialState: CasesState = {
  cases: [],
  currentCase: null,
  pageInfo: {
    hasNextPage: false
  },
  loading: false,
  error: null
}

export const reducer: ActionReducer<CasesState> = createReducer(
  initialState,
  on(casesActions.createManualCase, (state) => ({
    ...state,
    loading: true
  })),
  on(casesActions.createManualCaseSuccess, (state, { case: currentCase }) => ({
    ...state,
    currentCase,
    loading: false,
    error: null
  })),
  on(casesActions.createManualCaseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(casesActions.getCases, (state) => ({
    ...state,
    loading: true
  })),
  on(casesActions.getCasesSuccess, (state, { cases, pageInfo }) => ({
    ...state,
    loading: false,
    error: null,
    cases,
    pageInfo
  })),
  on(casesActions.getCasesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(casesActions.loadMoreCases, (state) => ({
    ...state,
    loading: true
  })),
  on(casesActions.loadMoreCasesSuccess, (state, { cases, pageInfo }) => ({
    ...state,
    loading: false,
    error: null,
    cases: [...state.cases, ...cases],
    pageInfo
  })),
  on(casesActions.loadMoreCasesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(casesActions.getCaseDetails, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(casesActions.getCaseDetailsSuccess, (state, { caseDetails }) => ({
    ...state,
    currentCase: caseDetails,
    loading: false,
    error: null
  })),
  on(casesActions.getCaseDetailsFailure, (state, { error }) => ({
    ...state,
    currentCase: null,
    loading: false,
    error
  })),
  on(casesActions.resetCases, () => initialState)
)

export const casesFeature = createFeature({
  name: 'cases',
  reducer,
  extraSelectors: ({ selectPageInfo, selectCurrentCase }) => ({
    selectHasNextPage: createSelector(
      selectPageInfo,
      (pageInfo) => pageInfo.hasNextPage
    ),
    selectCaseId: createSelector(
      selectCurrentCase,
      (caseDetails) => caseDetails?.id
    )
  })
})
