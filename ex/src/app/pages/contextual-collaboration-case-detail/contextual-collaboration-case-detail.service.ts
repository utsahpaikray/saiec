import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AddDescriptionDialogComponent } from '@shared/components/form-controls/file-upload/add-description-dialog/add-description-dialog.component'
import { AddedFileEvent } from '@shared/components/form-controls/file-upload/file-upload.component'
import attachmentActions from '@stores/attachment/attachment.actions'
import casesActions from '@stores/cases/cases.actions'
import { casesFeature } from '@stores/cases/cases.state'
import { Status } from '@stores/cases/interfaces/state.interface'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import maximoAssetsActions from '@stores/maximo-assets/maximo-assets.actions'
import { filter, map, NEVER, of, switchMap, withLatestFrom } from 'rxjs'
import { ContextualCollaborationCaseDetailVM } from './contextual-collaboration-case-detail.interface'
import {
  mapAffectedAsset,
  mapAttachment,
  mapAttachmentToMessage,
  mapAuthorName,
  mapContact,
  mapEventSource,
  mapMessage,
  mapStatusLabel,
  mapStatusToTagStatus,
  mapStatusUpdateMessage
} from './contextual-collaboration-case-detail.util'

@Injectable({
  providedIn: 'root'
})
export class ContextualCollaborationCaseDetailService {
  private store = inject(Store)

  public getVM$(caseId: string) {
    return this.store.select(casesFeature.selectCurrentCase).pipe(
      switchMap((caseDetails) => {
        if (caseDetails?.id === caseId) {
          return of(caseDetails)
        }
        this.store.dispatch(casesActions.getCaseDetails({ caseId }))
        return NEVER
      }),
      withLatestFrom(
        this.store
          .select(currentUserFeature.selectCurrentUserId)
          .pipe(filter(Boolean))
      ),
      map(
        ([
          caseDetails,
          currentUserId
        ]): ContextualCollaborationCaseDetailVM => ({
          id: caseDetails.id,
          headerVM: {
            title: caseDetails.title,
            statusKey: mapStatusLabel(caseDetails.status),
            statusValue: caseDetails.status,
            CloseButtonKey:
              'ContextualCollaboration.CaseDetails.Header.Action.Close',
            RejectButtonKey:
              'ContextualCollaboration.CaseDetails.Header.Action.Reject',
            WorkOrderButtonKey:
              'ContextualCollaboration.CaseDetails.Header.Action.WorkOrder',
            InProgressButtonKey:
              'ContextualCollaboration.CaseDetails.Header.Action.InProgress'
          },
          description: caseDetails.description,
          details: {
            reportedOn: caseDetails.created,
            reportedOnKey: 'ContextualCollaboration.CaseDetails.ReportedOnDate',
            reportedBy: {
              name: mapAuthorName(caseDetails.author),
              // TODO No email available on the author of the case
              email: ''
            },
            affectedAsset: mapAffectedAsset(caseDetails.affectedAsset),
            onSiteContact: mapContact(caseDetails.contact),
            eventSource: mapEventSource(caseDetails.eventSource),
            workOrderId: caseDetails.workOrderId
          },
          messages: caseDetails.messages
            .map((message) => mapMessage(message, currentUserId))
            .concat(
              caseDetails.statusUpdates.map((status) =>
                mapStatusUpdateMessage(status, currentUserId)
              )
            )
            .concat(
              caseDetails.attachments.map((message) =>
                mapAttachmentToMessage(message, currentUserId)
              )
            )
            .sort((a, b) => b.created.getTime() - a.created.getTime()),
          messageBoxVM: {
            disabled:
              caseDetails.status === Status.Closed ||
              caseDetails.status === Status.Rejected
          },
          fileUploadVM: {
            files: caseDetails.attachments.map(mapAttachment),
            modalComponent: AddDescriptionDialogComponent,
            modalComponentVM: {
              labels: {
                TITLE: 'AddFileDescriptionDialog.Title',
                SUBMIT: 'AddFileDescriptionDialog.Submit',
                CANCEL: 'AddFileDescriptionDialog.Cancel',
                FORM_TITLE: 'AddFileDescriptionDialog.Form.Title',
                FORM_EXPLANATION: 'AddFileDescriptionDialog.Form.Explanation',
                ITEM_EYEBROW: 'AddFileDescriptionDialog.Item.Eyebrow',
                ITEM_PLACEHOLDER: 'AddFileDescriptionDialog.Item.Placeholder'
              }
            },
            single: true,
            disabled: caseDetails.status === Status.Closed,
            labels: {
              ADD_ATTACHMENT:
                'ContextualCollaboration.NewCase.Attachments.AddAttachment',
              EYEBROW: 'ContextualCollaboration.NewCase.Attachments.Eyebrow',
              EMPTY_STATE_TITLE:
                'ContextualCollaboration.NewCase.Attachments.Emptystate.Title',
              EMPTY_STATE_EXPLANATION:
                'ContextualCollaboration.NewCase.Attachments.Emptystate.Explanation'
            }
          },
          inProgressConfirmationDialogVM: {
            title:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.InProgressCase.Title',
            message:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.InProgressCase.Message',
            confirm:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.InProgressCase.Confirm',
            cancel:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.InProgressCase.Cancel'
          },
          closeConfirmationDialogVM: {
            title:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CloseCase.Title',
            message:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CloseCase.Message',
            confirm:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CloseCase.Confirm',
            cancel:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CloseCase.Cancel'
          },
          rejectConfirmationDialogVM: {
            title:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.RejectCase.Title',
            message:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.RejectCase.Message',
            confirm:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.RejectCase.Confirm',
            cancel:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.RejectCase.Cancel'
          },
          createWorkOrderConfirmationDialogVM: {
            title:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CreateWorkOrder.Title',
            message:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CreateWorkOrder.Message',
            confirm:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CreateWorkOrder.Confirm',
            cancel:
              'ContextualCollaboration.CaseDetails.ConfirmationModal.CreateWorkOrder.Cancel'
          },
          statusTagVM: mapStatusToTagStatus(caseDetails.status),
          showRejectButton:
            caseDetails.status !== Status.Rejected &&
            caseDetails.status !== Status.Closed &&
            !caseDetails.workOrderId,
          showCloseButton:
            caseDetails.status !== Status.Open &&
            caseDetails.status !== Status.Closed &&
            caseDetails.status !== Status.Rejected,
          showInProgressButton:
            caseDetails.status !== Status.InProgress &&
            caseDetails.status !== Status.Closed &&
            caseDetails.status !== Status.Rejected,
          showCreateWorkOrderButton:
            caseDetails.status === Status.InProgress &&
            !caseDetails.workOrderId,
          attachmentPreviewVM: {
            titleKey:
              'ContextualCollaboration.CaseDetails.AttachmentPreview.Title',
            subTitleKey:
              'ContextualCollaboration.CaseDetails.AttachmentPreview.SubTitle',
            buttonKey:
              'ContextualCollaboration.CaseDetails.AttachmentPreview.ButtonText'
          },
          mfePreviewVM: {
            titleKey: 'ContextualCollaboration.CaseDetails.MFEPreview.Title',
            buttonKey:
              'ContextualCollaboration.CaseDetails.MFEPreview.ButtonText'
          },
          assetDetailsModalVM: {
            titleKey: 'AssetDetailsModal.TitleKey',
            subTitleValue: 'AssetDetailsModal.SubTitle',
            assetIdKey: 'AssetDetailsModal.AssetIdKey',
            assetIdValue: caseDetails.affectedAsset.name,
            markCodeKey: 'AssetDetailsModal.MarkCodeKey',
            markNumberKey: 'AssetDetailsModal.MarkNumberKey',
            descriptionKey: 'AssetDetailsModal.DescriptionKey'
          }
        })
      )
    )
  }

  public addAttachment(caseId: string, addedFileEvent: AddedFileEvent) {
    const file = addedFileEvent[0]
    if (!file.fileHandler || !file.description) {
      throw new Error('File and description are required')
    }
    file.remove()
    this.store.dispatch(
      casesActions.addAttachmentToCase({
        caseId,
        attachment: {
          name: file.name,
          description: file.description,
          file: file.fileHandler
        }
      })
    )
  }

  public addMessage(caseId: string, message: string) {
    this.store.dispatch(casesActions.addMessageToCase({ caseId, message }))
  }

  public inProgressCase(caseId: string) {
    this.store.dispatch(casesActions.inProgressCase({ caseId }))
  }

  public closeCase(caseId: string) {
    this.store.dispatch(casesActions.closeCase({ caseId }))
  }

  public rejectCase(caseId: string) {
    this.store.dispatch(casesActions.rejectCase({ caseId }))
  }

  public createWorkOrder(caseId: string) {
    this.store.dispatch(casesActions.createWorkOrder({ caseId }))
  }

  public fetchAttachment = (attachmentId: string) => {
    this.store.dispatch(
      attachmentActions.getAttachment({
        id: attachmentId
      })
    )
  }

  public downloadAttachment = (attachmentId: string) => {
    this.store.dispatch(
      attachmentActions.downloadAttachment({
        id: attachmentId
      })
    )
  }

  public fetchAssetFromAssetId = (assetId: string) => {
    this.store.dispatch(
      maximoAssetsActions.getCurrentAsset({
        assetId
      })
    )
  }
}
