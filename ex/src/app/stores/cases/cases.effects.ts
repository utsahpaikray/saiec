import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { getRouterSelectors } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import {
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  from,
  map,
  of,
  switchMap,
  withLatestFrom
} from 'rxjs'
import casesActions from './cases.actions'
import { casesFeature } from './cases.state'
import { AddAttachmentToCaseGQL } from './graphql/add-attachement-to-case.graphql-gen'
import { AddMessageToCaseGQL } from './graphql/add-message-to-case.graphql-gen'
import { CaseDetailsGQL } from './graphql/case-details.graphql-gen'
import {
  CasesBySiteIdGQL,
  CasesFragment
} from './graphql/cases-by-site-id.graphql-gen'
import { CloseCaseGQL } from './graphql/close-case.graphql-gen'
import { CreateCaseGQL } from './graphql/create-case.graphql-gen'
import { CreateWorkOrderGQL } from './graphql/create-work-order.graphql-gen'
import { InProgressCaseGQL } from './graphql/in-progress-case.graphql-gen'
import { OpenCaseGQL } from './graphql/open-case.graphql-gen'
import { RejectCaseGQL } from './graphql/reject-case.graphql-gen'
import {
  mapCaseDetail,
  mapCasesPageInfo,
  mapFetchCases,
  mapManualCase
} from './utils/cases-mapping'
import { fileToBase64 } from './utils/fileToBase64.util'

export const routerNavigationIsCases$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(
        getRouterSelectors().selectRouteDataParam('refreshCaseList')
      ),
      store
        .select(siteDetailFeature.selectSiteId)
        .pipe(filter(Boolean), distinctUntilChanged())
    ]).pipe(
      filter(([refreshCaseList]) => !!refreshCaseList),
      map(([, siteId]) =>
        casesActions.getCases({ siteId, disableCaching: true })
      )
    ),
  { functional: true }
)

export const createManualCase = createEffect(
  (actions$ = inject(Actions), createCaseGQL = inject(CreateCaseGQL)) =>
    actions$.pipe(
      ofType(casesActions.createManualCase),
      switchMap(({ manualCase }) =>
        from(mapManualCase(manualCase)).pipe(
          switchMap((mutationVariables) =>
            createCaseGQL.mutate(mutationVariables)
          ),
          filter((res) => !res.loading),
          map((res) => {
            if (!res.data?.createCase) {
              throw new Error('Case not created')
            }
            return casesActions.createManualCaseSuccess({
              case: mapCaseDetail(res.data.createCase)
            })
          }),
          catchError((error) => {
            return of(casesActions.createManualCaseFailure({ error }))
          })
        )
      )
    ),
  { functional: true }
)

export const getCases = createEffect(
  (actions$ = inject(Actions), casesBySiteIdGQL = inject(CasesBySiteIdGQL)) =>
    actions$.pipe(
      ofType(casesActions.getCases),
      switchMap(({ siteId, endCursor, disableCaching }) =>
        casesBySiteIdGQL
          .fetch(
            { siteId, endCursor },
            disableCaching ? { fetchPolicy: 'no-cache' } : undefined
          )
          .pipe(
            map((response) => {
              const cases = <CasesFragment[]>response.data.cases?.nodes
              if (!cases) {
                throw new Error('Cases not found')
              }

              return casesActions.getCasesSuccess({
                cases: response.data.cases?.nodes?.map(mapFetchCases) || [],
                pageInfo: mapCasesPageInfo(response.data.cases?.pageInfo)
              })
            }),
            catchError((error) => of(casesActions.getCasesFailure({ error })))
          )
      ),
      catchError((error) => of(casesActions.getCasesFailure({ error })))
    ),
  { functional: true }
)

export const loadMoreCases = createEffect(
  (actions$ = inject(Actions), casesBySiteIdGQL = inject(CasesBySiteIdGQL)) =>
    actions$.pipe(
      ofType(casesActions.loadMoreCases),
      switchMap(({ siteId, endCursor, disableCaching }) =>
        casesBySiteIdGQL
          .fetch(
            { siteId, endCursor },
            disableCaching ? { fetchPolicy: 'no-cache' } : undefined
          )
          .pipe(
            map((response) => {
              const cases = <CasesFragment[]>response.data.cases?.nodes
              if (!cases) {
                throw new Error('Cases not found')
              }

              return casesActions.loadMoreCasesSuccess({
                cases: response.data.cases?.nodes?.map(mapFetchCases) || [],
                pageInfo: mapCasesPageInfo(response.data.cases?.pageInfo)
              })
            }),
            catchError((error) =>
              of(casesActions.loadMoreCasesFailure({ error }))
            )
          )
      )
    ),
  { functional: true }
)

/* Case details */

export const getCaseDetails = createEffect(
  (actions$ = inject(Actions), caseDetailsGQL = inject(CaseDetailsGQL)) =>
    actions$.pipe(
      ofType(casesActions.getCaseDetails),
      switchMap(({ caseId, disableCaching }) =>
        caseDetailsGQL
          .fetch(
            { caseId },
            disableCaching ? { fetchPolicy: 'no-cache' } : undefined
          )
          .pipe(
            map((response) => {
              const caseDetails = response.data.case
              if (!caseDetails) {
                throw new Error('Case not found')
              }
              return casesActions.getCaseDetailsSuccess({
                caseDetails: mapCaseDetail(caseDetails)
              })
            }),
            catchError((error) =>
              of(casesActions.getCaseDetailsFailure({ error }))
            )
          )
      ),
      catchError((error) => of(casesActions.getCaseDetailsFailure({ error })))
    ),
  { functional: true }
)

export const changeCaseStatusToOpen = createEffect(
  (actions$ = inject(Actions), openCaseGQL = inject(OpenCaseGQL)) =>
    actions$.pipe(
      ofType(casesActions.openCase),
      switchMap(({ caseId }) =>
        openCaseGQL.mutate({ caseId }).pipe(
          map(() => casesActions.openCaseSuccess({ caseId })),
          catchError((error) => of(casesActions.openCaseFailure({ error })))
        )
      ),
      catchError((error) => of(casesActions.openCaseFailure({ error })))
    ),
  { functional: true }
)

export const changeCaseStatusToClose = createEffect(
  (actions$ = inject(Actions), closeCaseGQL = inject(CloseCaseGQL)) =>
    actions$.pipe(
      ofType(casesActions.closeCase),
      switchMap(({ caseId }) =>
        closeCaseGQL.mutate({ caseId }).pipe(
          map(() => casesActions.closeCaseSuccess({ caseId })),
          catchError((error) => of(casesActions.closeCaseFailure({ error })))
        )
      ),
      catchError((error) => of(casesActions.closeCaseFailure({ error })))
    ),
  { functional: true }
)

export const changeCaseStatusToInProgress = createEffect(
  (actions$ = inject(Actions), inProgressCaseGQL = inject(InProgressCaseGQL)) =>
    actions$.pipe(
      ofType(casesActions.inProgressCase),
      switchMap(({ caseId }) =>
        inProgressCaseGQL.mutate({ caseId }).pipe(
          map(() => casesActions.inProgressCaseSuccess({ caseId })),
          catchError((error) =>
            of(casesActions.inProgressCaseFailure({ error }))
          )
        )
      ),
      catchError((error) => of(casesActions.inProgressCaseFailure({ error })))
    ),
  { functional: true }
)

export const createWorkOrder = createEffect(
  (
    actions$ = inject(Actions),
    createWorkOrderGQL = inject(CreateWorkOrderGQL)
  ) =>
    actions$.pipe(
      ofType(casesActions.createWorkOrder),
      switchMap(({ caseId }) =>
        createWorkOrderGQL.mutate({ caseId }).pipe(
          map(() =>
            casesActions.createWorkOrderSuccess({
              caseId
            })
          ),
          catchError((error) =>
            of(casesActions.createWorkOrderFailure({ error }))
          )
        )
      ),
      catchError((error) => of(casesActions.createWorkOrderFailure({ error })))
    ),
  { functional: true }
)

export const changeCaseStatusToReject = createEffect(
  (actions$ = inject(Actions), rejectCaseGQL = inject(RejectCaseGQL)) =>
    actions$.pipe(
      ofType(casesActions.rejectCase),
      switchMap(({ caseId }) =>
        rejectCaseGQL.mutate({ caseId }).pipe(
          map(() => casesActions.rejectCaseSuccess({ caseId })),
          catchError((error) => of(casesActions.rejectCaseFailure({ error })))
        )
      ),
      catchError((error) => of(casesActions.rejectCaseFailure({ error })))
    ),
  { functional: true }
)

export const addMessageToCase = createEffect(
  (
    actions$ = inject(Actions),
    addMessageToCaseGQL = inject(AddMessageToCaseGQL)
  ) =>
    actions$.pipe(
      ofType(casesActions.addMessageToCase),
      switchMap(({ caseId, message }) =>
        addMessageToCaseGQL.mutate({ caseId, content: message }).pipe(
          map(() => casesActions.addMessageToCaseSuccess({ caseId })),
          catchError((error) =>
            of(casesActions.addMessageToCaseFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)

export const addAttachmentToCase = createEffect(
  (
    actions$ = inject(Actions),
    addAttachmentToCase = inject(AddAttachmentToCaseGQL)
  ) =>
    actions$.pipe(
      ofType(casesActions.addAttachmentToCase),
      switchMap(({ caseId, attachment }) =>
        from(fileToBase64(attachment.file)).pipe(
          switchMap((attachmentPayloadBase64) =>
            addAttachmentToCase
              .mutate({
                caseId,
                attachmentName: attachment.name,
                attachmentDescription: attachment.description,
                attachmentPayloadBase64
              })
              .pipe(
                map(() => casesActions.addAttachmentToCaseSuccess({ caseId })),
                catchError((error) =>
                  of(casesActions.addAttachmentToCaseFailure({ error }))
                )
              )
          )
        )
      )
    ),
  { functional: true }
)

export const refreshCaseDetails = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(
        casesActions.addAttachmentToCaseSuccess,
        casesActions.addMessageToCaseSuccess,
        casesActions.openCaseSuccess,
        casesActions.closeCaseSuccess,
        casesActions.rejectCaseSuccess,
        casesActions.inProgressCaseSuccess,
        casesActions.createWorkOrderSuccess
      ),
      withLatestFrom(store.select(casesFeature.selectCaseId)),
      filter(([{ caseId }, currentCaseId]) => caseId === currentCaseId),
      map(([{ caseId }]) =>
        casesActions.getCaseDetails({ caseId, disableCaching: true })
      )
    ),
  { functional: true }
)
