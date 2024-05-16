import { AssetSelectorVM } from '@shared/components/form-controls/asset-selector/asset-selector.component'
import { Asset } from '@shared/components/form-controls/asset-selector/interfaces/asset.interface'
import {
  AddDescriptionDialogComponent,
  AddDescriptionDialogVM
} from '@shared/components/form-controls/file-upload/add-description-dialog/add-description-dialog.component'
import { FileUploadVM } from '@shared/components/form-controls/file-upload/file-upload.component'

export interface Contact {
  id: string
  name: string
}

export interface Attachment {
  name: string
  description: string
  fileHandler: File
}

export interface ManualCase {
  siteId: string
  title: string
  description: string
  eventSource: CasesWorkOrder
  contact: Contact
  attachments?: Attachment[]
  asset?: Asset
}

export interface CasesWorkOrder {
  name: string
  value: string
}

export enum EventSources {
  Monitron = 'monitron',
  ShuttleHealth = 'shuttle-health',
  DivertHealth = 'divert-health',
  OperationalAwareness = 'operational-awareness'
}

export interface ContactSelectorVM {
  items: Contact[]
}

export interface EventSourceSelectorVM {
  items: CasesWorkOrder[]
}

export interface Case {
  title: string
  description: string
  eventSource: EventSources
  contact: Contact
  asset?: Asset
  attachments?: File[]
}

export interface NewCaseFormVM {
  value?: Partial<ManualCase>
  fileInputVM: FileUploadVM<
    AddDescriptionDialogVM,
    typeof AddDescriptionDialogComponent
  >
  eventSourceSelectorVM: EventSourceSelectorVM
  contactSelectorVM: ContactSelectorVM
  assetSelectorVM: AssetSelectorVM
}
