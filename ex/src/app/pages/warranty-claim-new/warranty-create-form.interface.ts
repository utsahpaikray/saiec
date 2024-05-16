import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { Asset } from '@core/generated/types'
import { DocumentInputType } from '@features/attachment-list/attachment-list.interface'

export interface WarrantyCreateForm
  extends FormGroup<{
    customerSiteContactId: FormControl<string>
    ticketReference: FormControl<string>
    summary: FormControl<string>
    warrantyItems: FormArray<WarrantyItemControl>
  }> {}

export interface WarrantyItemGroup {
  asset: FormControl<Asset | null>
  item: FormControl<Asset | null>
  itemQuantity: FormControl<string>
  serialNumber: FormControl<string>
  warrantyReason: FormControl<string>
  warrantyInfo: FormControl<string>
  breakdownDate: FormControl<string>
  attachments: FormArray
}

export interface WarrantyItemControl extends FormControl<WarrantyItem> {}

export interface WarrantyItem {
  asset: Asset | null
  item: Asset | null
  itemQuantity: string
  serialNumber: string
  warrantyReason: string
  warrantyInfo: string
  breakdownDate: string
  attachments: DocumentInputType[]
}

export interface AttachmentFormGroup
  extends FormGroup<{
    description: FormControl<string>
    documentData: FormControl<string>
    documentName: FormControl<string>
    id: FormControl<string>
  }> {}

export interface EditWarrantyItem {
  isEdit: boolean
}
