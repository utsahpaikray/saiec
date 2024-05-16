export interface AttachmentState {
  attachment: Attachment | null
  contentType: string | null
  loading: boolean
  error: Error | null
}

export interface AttachmentResponse {
  id: string
  fileName: string
  url: string
  contentType: string
}

export interface Attachment {
  id: string
  type: string
  fileName: string
  objectUrl: string
}
