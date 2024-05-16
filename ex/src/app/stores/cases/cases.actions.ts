import { createActionGroup, emptyProps, props } from '@ngrx/store'
import {
  Case,
  CaseDetail,
  NewCasePayload,
  PageInfo,
  Status
} from './interfaces/state.interface'

export default createActionGroup({
  source: 'Cases',
  events: {
    createManualCase: props<{ manualCase: NewCasePayload }>(),
    createManualCaseSuccess: props<{ case: CaseDetail }>(),
    createManualCaseFailure: props<{ error: Error }>(),

    getCases: props<{
      siteId: string
      endCursor?: string
      disableCaching?: boolean
    }>(),
    getCasesSuccess: props<{ cases: Case[]; pageInfo: PageInfo }>(),
    getCasesFailure: props<{ error: Error }>(),
    resetCases: emptyProps(),
    loadMoreCases: props<{
      siteId: string
      endCursor?: string
      disableCaching?: boolean
    }>(),
    loadMoreCasesSuccess: props<{ cases: Case[]; pageInfo: PageInfo }>(),
    loadMoreCasesFailure: props<{ error: Error }>(),

    /* Case Details */
    /** @NOTE caching needs to be disabled when we want to refresh the same case with new data */
    getCaseDetails: props<{ caseId: string; disableCaching?: boolean }>(),
    getCaseDetailsSuccess: props<{ caseDetails: CaseDetail }>(),
    getCaseDetailsFailure: props<{ error: Error }>(),

    changeCaseStatus: props<{
      caseId: string
      status: Status
    }>(),
    openCase: props<{ caseId: string }>(),
    openCaseSuccess: props<{ caseId: string }>(),
    openCaseFailure: props<{ error: Error }>(),

    closeCase: props<{ caseId: string }>(),
    closeCaseSuccess: props<{ caseId: string }>(),
    closeCaseFailure: props<{ error: Error }>(),

    createWorkOrder: props<{ caseId: string }>(),
    createWorkOrderSuccess: props<{ caseId: string }>(),
    createWorkOrderFailure: props<{ error: Error }>(),

    rejectCase: props<{ caseId: string }>(),
    rejectCaseSuccess: props<{ caseId: string }>(),
    rejectCaseFailure: props<{ error: Error }>(),

    inProgressCase: props<{ caseId: string }>(),
    inProgressCaseSuccess: props<{ caseId: string }>(),
    inProgressCaseFailure: props<{ error: Error }>(),

    addMessageToCase: props<{ caseId: string; message: string }>(),
    addMessageToCaseSuccess: props<{ caseId: string }>(),
    addMessageToCaseFailure: props<{ error: Error }>(),

    addAttachmentToCase: props<{
      caseId: string
      attachment: {
        name: string
        description: string
        file: File
      }
    }>(),
    addAttachmentToCaseSuccess: props<{ caseId: string }>(),
    addAttachmentToCaseFailure: props<{ error: Error }>()
  }
})
