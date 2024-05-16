import {
  AccountManagerContact,
  ContractManagerContact,
  ItManagerContact,
  ServiceDeskContact,
  SparePartsContact,
  VisitingOfficeContact
} from '../generated/types'

export type SiteContacts = {
  contractManagerContact: ContractManagerContact
  accountManagerContact: AccountManagerContact
  itManagerContact: ItManagerContact
  visitingOfficeContact: VisitingOfficeContact
  serviceDeskContact: ServiceDeskContact
  sparePartsContact: SparePartsContact
}
