import { AssetDetailsModalVM } from '@shared/components/asset-details-modal/asset-details-modal.component'
import { AttachmentPreviewVM } from '@shared/components/attachment-preview/attachment-preview.component'
import { ConfirmationModalVM } from '@shared/components/confirmation-modal/confirmation-modal.component'
import { FileUploadVM } from '@shared/components/form-controls/file-upload/file-upload.component'
import { MessageBoxVM } from '@shared/components/messaging/message-box/message-box.component'
import { MessageVM } from '@shared/components/messaging/message/message.component'
import {
  MFEType,
  MfePreviewVM
} from '@shared/components/mfe-preview/mfe-preview.component'
import { TagStatus } from '@shared/directives/status/status.directive'

export interface CaseDetailContact {
  name: string
  email: string
}

export interface CaseDetailAsset {
  name: string
}

export enum CaseConfirmationType {
  ToReject = 'toReject',
  ToClose = 'toClose',
  ToInprogress = 'toInprogress',
  CreateWorkOrder = 'createWorkOrder'
}

export interface CaseDetail {
  reportedOnKey: string
  reportedOn: Date
  reportedBy: CaseDetailContact
  affectedAsset: CaseDetailAsset
  onSiteContact: CaseDetailContact
  eventSource: string
  workOrderId: string
}

export interface CaseDetailsHeaderVM {
  title: string
  statusKey: string
  statusValue: string
  CloseButtonKey: string
  RejectButtonKey: string
  WorkOrderButtonKey: string
  InProgressButtonKey: string
}

export type MessageWithAttachment = MessageVM & {
  attachmentType?: AttachmentType
  media?: {
    url?: string
    name?: string
  }
  mfe?: {
    type: MFEType
    data: {
      startTime: number
      endTime: number
    }
  }
}

export enum AttachmentType {
  Image = 'image',
  Video = 'video',
  Pdf = 'pdf',
  Zip = 'zip',
  Doc = 'doc',
  Xls = 'xls',
  Other = 'other',
  MFE = 'mfe'
}

export interface ContextualCollaborationCaseDetailVM {
  id: string
  headerVM: CaseDetailsHeaderVM
  description: string
  details: CaseDetail
  fileUploadVM: FileUploadVM
  messageBoxVM: MessageBoxVM
  messages: MessageWithAttachment[]
  inProgressConfirmationDialogVM: ConfirmationModalVM
  closeConfirmationDialogVM: ConfirmationModalVM
  rejectConfirmationDialogVM: ConfirmationModalVM
  createWorkOrderConfirmationDialogVM: ConfirmationModalVM
  statusTagVM: TagStatus
  showRejectButton: boolean
  showCloseButton: boolean
  showInProgressButton: boolean
  showCreateWorkOrderButton: boolean
  attachmentPreviewVM: Omit<AttachmentPreviewVM, 'subTitleValue'>
  mfePreviewVM: Omit<MfePreviewVM, 'mfe' | 'titleValue'>
  assetDetailsModalVM: AssetDetailsModalVM
}
