import { Observable, of } from 'rxjs'
import { SiteContacts } from './sites.model'
import { Segment } from '@core/generated/types'

export const MockSiteContacts: SiteContacts = {
  accountManagerContact: {
    name: 'Vera',
    phoneNumber: '4-863-405-2600',
    emailAddress: 'Vera_Ballard3855@infotech44.tech',
    alternativeContactTitle: 'Health Educator',
    show: true,
    __typename: 'AccountManagerContact'
  },
  contractManagerContact: {
    name: 'Laila',
    phoneNumber: '1-145-565-4357',
    emailAddress: 'Laila_Thorpe2921@muall.tech',
    alternativeContactTitle: 'Biologist',
    __typename: 'ContractManagerContact'
  },
  itManagerContact: {
    name: 'Karen',
    phoneNumber: '2-345-676-6056',
    emailAddress: 'Karen_Holmes2921@typill.biz',
    alternativeContactTitle: 'Systems Administrator',
    show: true,
    __typename: 'ItManagerContact'
  },
  serviceDeskContact: {
    name: 'Ronald',
    phoneNumber: '8-101-247-1447',
    emailAddress: 'Ronald_Quinnell3459@infotech44.tech',
    alternativeContactTitle: '',
    phoneNumberOutsideWorkingHours: '7-101-247-1000',
    show: true,
    __typename: 'ServiceDeskContact'
  },
  sparePartsContact: {
    emailAddress: 'Ramon_Dillon2409@bauros.biz',
    alternativeContactTitle: '',
    show: true,
    __typename: 'SparePartsContact'
  },
  visitingOfficeContact: {
    name: 'Sed Corporation',
    address: 'Ap #882-1168 Dis Rd.,Masterton\\n479105,Upper Austria,Ukraine',
    email: 'purus.gravida@icloud.ca',
    phoneNumber: '044 2288272',
    alternativeContactTitle: '',
    show: true,
    __typename: 'VisitingOfficeContact'
  }
}
export class SitesServiceMock {
  getSiteById(siteId: string): Observable<any> {
    return of({ id: siteId })
  }

  getSiteContacts(): Observable<SiteContacts> {
    return of(MockSiteContacts)
  }

  getSiteProjectsSegmentBasedOnRole(): Observable<Segment | null> {
    return of('Airports' as Segment)
  }
}
