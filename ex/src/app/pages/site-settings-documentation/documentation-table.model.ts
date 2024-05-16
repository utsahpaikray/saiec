export interface DocumentationTableDocument {
  name: string
  contentLength?: number
  culture?: string
  isDeleting: boolean
  deleted: boolean
}

export interface DocumentationTableCategory {
  isOpen: boolean
  name: string
  contentLength?: number
  documentsAmount: number
  documents?: DocumentationTableDocument[]
}

export type DocumentationTableDocumentDeleteEvent = {
  index: number
  name: string
}

export type DocumentationTableDocumentDelete = {
  categoryIndex: number
  index: number
  name: string
}
