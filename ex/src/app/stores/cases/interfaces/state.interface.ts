export enum Status {
  Open = 'open',
  InProgress = 'in-progress',
  Closed = 'closed',
  Rejected = 'rejected'
}

export interface Contact {
  id: string
  name: string
  email?: string
}

export interface AttachmentPayload {
  name: string
  description: string
  file: File
}

export enum EventSources {
  Monitron = 'monitron',
  ShuttleHealth = 'shuttle-health',
  DivertHealth = 'divert-health',
  OperationalAwareness = 'operational-awareness'
}

export interface NewCasePayload {
  siteId: string
  title: string
  description: string
  eventSource: EventSources
  contact: Contact
  attachments?: AttachmentPayload[]
  assetSystemComponentId?: string
}

export interface Case {
  id: string
  title: string
  createAt: Date
  description: string
  status: Status
  type: string
  eventSource: EventSources
  lastUpdatedAt: Date
  workOrderNumber: string | null
}

export interface CaseDetail {
  id: string
  created: Date
  title: string
  description: string
  status: Status
  messages: Message[]
  attachments: Attachment[]
  affectedAsset: AffectedAsset
  author: Author
  contact: Contact
  statusUpdates: StatusUpdate[]
  eventSource: EventSources
  workOrderId: string
}
export interface Author {
  id: string
  firstName: string
  middleName: string
  lastName: string
}

export interface Message {
  id: string
  created: Date
  content: string
  author: Author
}

export interface Attachment {
  id: string
  name: string
  description: string
  created: Date
  author: Author
  thumbnailUrl?: string
  contentType?: string
}

export interface AffectedAsset {
  name: string
}

export interface StatusUpdate {
  id: string
  created: Date
  status: Status
  author: Author
}

export interface CasesState {
  cases: Case[]
  currentCase: CaseDetail | null
  pageInfo: PageInfo
  loading: boolean
  error: Error | null
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor?: string
}
