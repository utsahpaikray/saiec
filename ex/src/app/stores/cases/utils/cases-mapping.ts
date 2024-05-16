import {
  CaseStatus as CaseStatusBackend,
  CreateCaseAttachmentInput,
  Source
} from '@core/generated/types'
import { CaseDetailsQuery } from '../graphql/case-details.graphql-gen'
import {
  CasesBySiteIdQuery,
  CasesFragment
} from '../graphql/cases-by-site-id.graphql-gen'
import { CreateCaseMutationVariables } from '../graphql/create-case.graphql-gen'
import {
  Attachment,
  AttachmentPayload,
  Author,
  Case,
  CaseDetail,
  EventSources,
  Message,
  NewCasePayload,
  PageInfo,
  Status,
  StatusUpdate
} from '../interfaces/state.interface'
import { fileToBase64 } from './fileToBase64.util'

type CaseDetailsQueryCase = NonNullable<CaseDetailsQuery['case']>
type CaseDetailsQueryMessage = CaseDetailsQueryCase['messages'][0]
type CaseDetailsQueryAttachment = CaseDetailsQueryCase['attachments'][0]
type CaseDetailsQueryAuthor = CaseDetailsQueryCase['author']
type CaseDetailsQueryStatusUpdate = CaseDetailsQueryCase['statusUpdates'][0]
type CasesPageInfo = NonNullable<CasesBySiteIdQuery['cases']>['pageInfo']

const mapAttachmentPayload = async (
  attachment: AttachmentPayload
): Promise<CreateCaseAttachmentInput> => ({
  name: attachment.name,
  description: attachment.description,
  payloadBase64: await fileToBase64(attachment.file)
})

const mapEventSource = (eventSource: EventSources): Source => {
  switch (eventSource) {
    case EventSources.Monitron:
      return Source.Monitron
    case EventSources.ShuttleHealth:
      return Source.ShtHealth
    case EventSources.DivertHealth:
      return Source.CarHealth
    case EventSources.OperationalAwareness:
      return Source.Insights
  }
}

const mapSourceToEventSource = (eventSource: Source): EventSources =>
  ({
    [Source.Monitron]: EventSources.Monitron,
    [Source.ShtHealth]: EventSources.ShuttleHealth,
    [Source.CarHealth]: EventSources.DivertHealth,
    [Source.Insights]: EventSources.OperationalAwareness
  })[eventSource]

const mapCaseStatus = (status: CaseStatusBackend): Status =>
  ({
    [CaseStatusBackend.Open]: Status.Open,
    [CaseStatusBackend.InProgress]: Status.InProgress,
    [CaseStatusBackend.Closed]: Status.Closed,
    [CaseStatusBackend.Rejected]: Status.Rejected
  })[status]

export const mapManualCase = async (
  manualCase: NewCasePayload
): Promise<CreateCaseMutationVariables> => ({
  title: manualCase.title,
  description: manualCase.description,
  siteId: manualCase.siteId,
  assetSystemComponentId: manualCase.assetSystemComponentId,
  eventSource: mapEventSource(manualCase.eventSource),
  createCaseContactPerson: {
    name: manualCase.contact.name,
    emailAddress: manualCase.contact.email || '',
    samAccountName: manualCase.contact.id || ''
  },
  attachments: await Promise.all(
    manualCase.attachments?.map(mapAttachmentPayload) || []
  )
})

export const mapCasesPageInfo = (
  pageInfoBackend: CasesPageInfo | undefined
): PageInfo => ({
  hasNextPage: pageInfoBackend?.hasNextPage || false,
  endCursor: pageInfoBackend?.endCursor || undefined
})

export const mapFetchCases = (casesBySiteId: CasesFragment): Case => ({
  id: casesBySiteId.id,
  title: casesBySiteId.title,
  createAt: new Date(casesBySiteId.dateTimeCreated),
  description: casesBySiteId.description ?? '',
  status: mapCaseStatus(casesBySiteId.status),
  type: casesBySiteId.type,
  eventSource: mapSourceToEventSource(casesBySiteId.source),
  lastUpdatedAt: [
    ...casesBySiteId.statusUpdates,
    ...casesBySiteId.attachments,
    ...casesBySiteId.messages,
    ...casesBySiteId.references
  ]
    .map((item) => new Date(item.dateTimeCreated))
    .sort((a, b) => b.getTime() - a.getTime())[0],
  workOrderNumber: [...casesBySiteId.workOrders]?.[0]?.orderNumber
})

export const mapAuthor = (author?: CaseDetailsQueryAuthor): Author => ({
  id: author?.userId || '',
  firstName: author?.firstName || '',
  middleName: author?.middleName || '',
  lastName: author?.lastName || ''
})

export const mapMessage = (message: CaseDetailsQueryMessage): Message => ({
  id: message.id,
  created: new Date(message.dateTimeCreated),
  content: message.content,
  author: mapAuthor(message.author)
})

export const mapAttachment = (
  attachment: CaseDetailsQueryAttachment
): Attachment => ({
  id: attachment.id,
  name: attachment.name,
  description: attachment.description || '',
  created: new Date(attachment.dateTimeCreated),
  author: mapAuthor(attachment.author),
  thumbnailUrl: attachment.ThumbnailUrlWithToken ?? undefined,
  contentType: attachment.contentType ?? undefined
})

export const mapStatusUpdate = (
  statusUpdate: CaseDetailsQueryStatusUpdate
): StatusUpdate => ({
  id: statusUpdate.id,
  created: new Date(statusUpdate.dateTimeCreated),
  status: mapCaseStatus(statusUpdate.status),
  author: mapAuthor(statusUpdate.author)
})

export const mapAffectedAsset = (name?: string | null) => ({
  name: name || ''
})

export const mapCaseDetail = (
  caseDetails: CaseDetailsQueryCase
): CaseDetail => ({
  id: caseDetails.id,
  title: caseDetails.title,
  description: caseDetails.description || '',
  status: mapCaseStatus(caseDetails.status),
  messages: caseDetails.messages?.map(mapMessage) || [],
  attachments: caseDetails.attachments?.map(mapAttachment) || [],
  affectedAsset: mapAffectedAsset(caseDetails.assetSystemComponentId),
  author: mapAuthor(caseDetails.author),
  contact: {
    id: caseDetails.contactPerson?.samAccountName || '',
    name: caseDetails.contactPerson?.name || '',
    email: caseDetails.contactPerson?.emailAddress || ''
  },
  created: new Date(caseDetails.dateTimeCreated),
  statusUpdates: caseDetails.statusUpdates?.map(mapStatusUpdate) || [],
  eventSource: mapSourceToEventSource(caseDetails.source),
  workOrderId: [...caseDetails.workOrders]?.[0]?.orderNumber
})
