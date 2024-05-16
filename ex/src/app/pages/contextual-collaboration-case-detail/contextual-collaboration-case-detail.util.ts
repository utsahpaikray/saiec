import { EventSources } from '@pages/site-settings-general/site-settings-general-form.interface'
import { File } from '@shared/components/form-controls/file-upload/interfaces/file.interface'
import {
  MessageType,
  MessageVM
} from '@shared/components/messaging/message/message.component'
import { MFEType } from '@shared/components/mfe-preview/mfe-preview.component'
import { TagStatus } from '@shared/directives/status/status.directive'

import {
  AffectedAsset,
  Attachment,
  Author,
  Contact,
  Message,
  Status,
  StatusUpdate
} from '@stores/cases/interfaces/state.interface'
import {
  AttachmentType,
  CaseDetailAsset,
  CaseDetailContact,
  MessageWithAttachment
} from './contextual-collaboration-case-detail.interface'

export const mapStatusLabel = (status: Status): string =>
  ({
    [Status.Open]: 'ContextualCollaboration.CaseDetails.Header.Status.Open',
    [Status.Closed]: 'ContextualCollaboration.CaseDetails.Header.Status.Closed',
    [Status.InProgress]:
      'ContextualCollaboration.CaseDetails.Header.Status.InProgress',
    [Status.Rejected]:
      'ContextualCollaboration.CaseDetails.Header.Status.Rejected'
  })[status] || ''

export const mapMiddleName = (middleName: string): string =>
  middleName ? ` ${middleName[0]}. ` : ''
export const mapAuthorName = (author: Author): string =>
  `${author.firstName} ${mapMiddleName(author.middleName)} ${
    author.lastName
  }`.replace(/\s+/g, ' ')

const checkIfAuthorIsCurrentUser = (
  author: Author,
  currentUserId: string
): boolean => author.id === currentUserId

export const mapAttachment = (attachment: Attachment): File => ({
  name: attachment.name,
  description: attachment.description,
  url: attachment.thumbnailUrl,
  removable: false
})
export const mapAffectedAsset = (
  affectedAsset: AffectedAsset
): CaseDetailAsset => ({
  name: affectedAsset.name
})
export const mapContact = (contact: Contact): CaseDetailContact => ({
  name: contact.name,
  email: contact.email || ''
})
export const mapMessage = (
  message: Message,
  currentUserId: string
): MessageVM => ({
  id: message.id,
  author: mapAuthorName(message.author),
  content: message.content,
  created: message.created,
  authorIsCurrentUser: checkIfAuthorIsCurrentUser(
    message.author,
    currentUserId
  ),
  messageType: MessageType.Text
})

export const mapStatusUpdateMessage = (
  statusUpdate: StatusUpdate,
  currentUserId: string
): MessageWithAttachment => {
  const author = mapAuthorName(statusUpdate.author).trim()
  return {
    id: statusUpdate.id,
    author: author || 'SYSTEM',
    authorIsCurrentUser: checkIfAuthorIsCurrentUser(
      statusUpdate.author,
      currentUserId
    ),
    content: `Status changed to ${statusUpdate.status} ${
      author ? `by ${author}` : ''
    }`,
    created: statusUpdate.created,
    messageType: MessageType.Status,
    status: statusUpdate.status
  }
}

export const mapContentTypeToMediaType = (
  contentType?: string
): AttachmentType =>
  contentType
    ? {
        'application/doc': AttachmentType.Doc,
        'application/ms-doc': AttachmentType.Doc,
        'application/msword': AttachmentType.Doc,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          AttachmentType.Doc,
        'image/jpeg': AttachmentType.Image,
        'image/pjpeg': AttachmentType.Image,
        'image/png': AttachmentType.Image,
        'image/gif': AttachmentType.Image,
        'application/pdf': AttachmentType.Pdf,
        'application/excel': AttachmentType.Xls,
        'application/vnd.ms-excel': AttachmentType.Xls,
        'application/x-excel': AttachmentType.Xls,
        'application/x-msexcel': AttachmentType.Xls,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          AttachmentType.Xls,
        'application/zip': AttachmentType.Zip,
        'application/x-zip-compressed': AttachmentType.Zip
      }[contentType] || AttachmentType.Other
    : AttachmentType.Other

// TODO: This is a temporary solution to map the MFE attachments to the MFE preview component
export const mapAttachmentToHealthyMfe = (attachment: Attachment) =>
  attachment.name === 'mfe-healthy.pdf'
    ? {
        attachmentType: AttachmentType.MFE,
        mfe: {
          type: MFEType.Anomalies,
          data: {
            startTime: 1704068976,
            endTime: 1705276800
          }
        }
      }
    : undefined

// TODO: This is a temporary solution to map the MFE attachments to the MFE preview component
export const mapAttachmentToAnomalousMfe = (attachment: Attachment) =>
  attachment.name === 'mfe-anomalous.pdf'
    ? {
        attachmentType: AttachmentType.MFE,
        mfe: {
          type: MFEType.Anomalies,
          data: {
            startTime: 1704068976,
            endTime: 1704788976
          }
        }
      }
    : undefined

export const mapAttachmentToMessage = (
  attachment: Attachment,
  currentUserId: string
): MessageVM =>
  Object.assign(
    {
      id: attachment.id,
      author: mapAuthorName(attachment.author),
      content: attachment.description,
      created: attachment.created,
      authorIsCurrentUser: checkIfAuthorIsCurrentUser(
        attachment.author,
        currentUserId
      ),
      messageType: MessageType.Attachment
    },
    mapAttachmentToHealthyMfe(attachment) ||
      mapAttachmentToAnomalousMfe(attachment) || {
        attachmentType: mapContentTypeToMediaType(attachment.contentType),
        media: {
          url: attachment.thumbnailUrl,
          name: attachment.name
        }
      }
  )

export const mapEventSource = (eventSource: string) =>
  ({
    [EventSources.Monitron]:
      'ContextualCollaboration.CaseOverview.EventSource.Monitron',
    [EventSources.ShuttleHealth]:
      'ContextualCollaboration.CaseOverview.EventSource.ShuttleHealth',
    [EventSources.DivertHealth]:
      'ContextualCollaboration.CaseOverview.EventSource.DivertHealth',
    [EventSources.OperationalAwareness]:
      'ContextualCollaboration.CaseOverview.EventSource.OperationalAwareness'
  })[eventSource] || ''

export const mapStatusToTagStatus = (status: Status) =>
  ({
    [Status.Open]: TagStatus.action,
    [Status.InProgress]: TagStatus.warning,
    [Status.Closed]: TagStatus.success,
    [Status.Rejected]: TagStatus.error
  })[status]
