import { FormControl, FormGroup } from '@angular/forms'

export type ContactsForm = FormGroup<{
  contractManagerContact: ContractManagerContactGroup
  accountManagerContact: AccountManagerContactGroup
  itManagerContact: ItManagerContactGroup
  serviceDeskContact: ServiceDeskContactGroup
  sparePartsContact: SparePartsContactGroup
  visitingOfficeContact: VisitingOfficeContactGroup
}>

export type ContractManagerContactGroup = FormGroup<{
  alternativeContactTitle: FormControl<string>
}>

export type AccountManagerContactGroup = FormGroup<{
  show: FormControl<boolean>
  alternativeContactTitle: FormControl<string>
}>

export type ItManagerContactGroup = FormGroup<{
  show: FormControl<boolean>
  alternativeContactTitle: FormControl<string>
}>

export type ServiceDeskContactGroup = FormGroup<{
  show: FormControl<boolean>
  alternativeContactTitle: FormControl<string>
}>

export type SparePartsContactGroup = FormGroup<{
  show: FormControl<boolean>
  alternativeContactTitle: FormControl<string>
  emailAddress: FormControl<string>
}>

export type VisitingOfficeContactGroup = FormGroup<{
  show: FormControl<boolean>
  alternativeContactTitle: FormControl<string>
  name: FormControl<string>
  address: FormControl<string>
  email: FormControl<string>
  phoneNumber: FormControl<string>
}>

export interface ReadonlyContacts {
  contractManagerContact: ReadOnlyContact
  accountManagerContact: ReadOnlyContact
  itManagerContact: ReadOnlyContact
  serviceDeskContact: ServiceDeskReadonlyContacts
}

export type ReadonlyContactsType = ReadOnlyContact | ServiceDeskReadonlyContacts

export interface ServiceDeskReadonlyContacts extends ReadOnlyContact {
  phoneNumberOutsideWorkingHours: string
}

export interface ReadOnlyContact {
  emailAddress: string
  name: string
  phoneNumber: string
}
