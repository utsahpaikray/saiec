import { AbortController } from '@azure/abort-controller'

export interface AzureBlobStorageFile {
  id: string
  name: string
  category: string
  size: number
  progress: number
  uploaded: boolean
  processed: boolean
  canceled: boolean
  abortController: AbortController
}
