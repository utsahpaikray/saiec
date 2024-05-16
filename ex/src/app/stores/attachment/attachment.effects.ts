import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { casesFeature } from '@stores/cases/cases.state'
import {
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  withLatestFrom
} from 'rxjs'
import attachmentActions from './attachment.actions'
import { attachmentFeature } from './attachment.state'
import { AttachmentPreviewGQL } from './graphql/attachment-preview.graphql-gen'
import { mapAttachmentPreview } from './utils/attachment-mapping'

export const getCaseAttachmentPreview = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    attachmentPreviewGQL = inject(AttachmentPreviewGQL),
    http = inject(HttpClient)
  ) =>
    actions$.pipe(
      ofType(attachmentActions.getAttachment),
      withLatestFrom(
        store.select(casesFeature.selectCaseId),
        store.select(attachmentFeature.selectAttachment)
      ),
      switchMap(([{ id }, caseId, attachment]) => {
        if (attachment?.id && attachment?.id !== id) {
          URL.revokeObjectURL(attachment.objectUrl)
        }

        return attachmentPreviewGQL.fetch({ caseId, attachmentId: id }).pipe(
          map(({ data }) => {
            const caseAttachment = data.case?.attachments[0]
            if (!caseAttachment) {
              throw new Error('Attachment not found')
            }
            return mapAttachmentPreview(caseAttachment)
          }),
          switchMap((caseAttachment) =>
            combineLatest([
              http.get(caseAttachment.url, { responseType: 'blob' }), // Return a Blob from the URL
              of(caseAttachment)
            ])
          ),
          map(([blob, { id, fileName, contentType }]) =>
            attachmentActions.getAttachmentSuccess({
              id,
              fileName,
              blob,
              contentType
            })
          ),
          catchError((error) =>
            of(attachmentActions.getAttachmentFailure({ error }))
          )
        )
      }),
      catchError((error) =>
        of(attachmentActions.getAttachmentFailure({ error }))
      )
    ),
  { functional: true }
)

export const downloadAttachment = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    attachmentPreviewGQL = inject(AttachmentPreviewGQL)
  ) =>
    actions$.pipe(
      ofType(attachmentActions.downloadAttachment),
      withLatestFrom(store.select(casesFeature.selectCaseId)),
      switchMap(([{ id }, caseId]) =>
        attachmentPreviewGQL.fetch({ caseId, attachmentId: id }).pipe(
          map((response) => {
            const url = response.data.case?.attachments[0].UrlWithToken
            const name = response.data.case?.attachments[0].name
            if (!url) {
              throw new Error('Attachment not found')
            }
            return attachmentActions.downloadAttachmentSuccess({ url, name })
          }),
          catchError((error) =>
            of(attachmentActions.downloadAttachmentFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)
