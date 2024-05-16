import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ContractManagerContactFragment = { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null };

export type ItManagerContactFragment = { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean };

export type AccountManagerContactFragment = { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean };

export type ServiceDeskContactFragment = { __typename?: 'ServiceDeskContact', name?: string | null, phoneNumber?: string | null, emailAddress?: string | null, alternativeContactTitle?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean };

export type SparePartsContactFragment = { __typename?: 'SparePartsContact', emailAddress?: string | null, alternativeContactTitle?: string | null, show: boolean };

export type VisitingOfficeContactFragment = { __typename?: 'VisitingOfficeContact', name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, alternativeContactTitle?: string | null, show: boolean };

export type ContactsBySiteIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type ContactsBySiteIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', accountManagerContact: { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, contractManagerContact: { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null }, itManagerContact: { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, serviceDeskContact: { __typename?: 'ServiceDeskContact', name?: string | null, phoneNumber?: string | null, emailAddress?: string | null, alternativeContactTitle?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean }, sparePartsContact: { __typename?: 'SparePartsContact', emailAddress?: string | null, alternativeContactTitle?: string | null, show: boolean }, visitingOfficeContact: { __typename?: 'VisitingOfficeContact', name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, alternativeContactTitle?: string | null, show: boolean } }> };

export const ContractManagerContactFragmentDoc = gql`
    fragment ContractManagerContact on ContractManagerContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
}
    `;
export const ItManagerContactFragmentDoc = gql`
    fragment ItManagerContact on ItManagerContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
  show
}
    `;
export const AccountManagerContactFragmentDoc = gql`
    fragment AccountManagerContact on AccountManagerContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
  show
}
    `;
export const ServiceDeskContactFragmentDoc = gql`
    fragment ServiceDeskContact on ServiceDeskContact {
  name
  phoneNumber
  emailAddress
  alternativeContactTitle
  phoneNumberOutsideWorkingHours
  show
}
    `;
export const SparePartsContactFragmentDoc = gql`
    fragment SparePartsContact on SparePartsContact {
  emailAddress
  alternativeContactTitle
  show
}
    `;
export const VisitingOfficeContactFragmentDoc = gql`
    fragment VisitingOfficeContact on VisitingOfficeContact {
  name
  address
  email
  phoneNumber
  alternativeContactTitle
  show
}
    `;
export const ContactsBySiteIdDocument = gql`
    query contactsBySiteId($siteId: UUID!) {
  sites(where: {id: {eq: $siteId}}) {
    accountManagerContact {
      ...AccountManagerContact
    }
    contractManagerContact {
      ...ContractManagerContact
    }
    itManagerContact {
      ...ItManagerContact
    }
    serviceDeskContact {
      ...ServiceDeskContact
    }
    sparePartsContact {
      ...SparePartsContact
    }
    visitingOfficeContact {
      ...VisitingOfficeContact
    }
  }
}
    ${AccountManagerContactFragmentDoc}
${ContractManagerContactFragmentDoc}
${ItManagerContactFragmentDoc}
${ServiceDeskContactFragmentDoc}
${SparePartsContactFragmentDoc}
${VisitingOfficeContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ContactsBySiteIdGQL extends Apollo.Query<ContactsBySiteIdQuery, ContactsBySiteIdQueryVariables> {
    document = ContactsBySiteIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    contactsBySiteId: 'contactsBySiteId'
  },
  Fragment: {
    ContractManagerContact: 'ContractManagerContact',
    ItManagerContact: 'ItManagerContact',
    AccountManagerContact: 'AccountManagerContact',
    ServiceDeskContact: 'ServiceDeskContact',
    SparePartsContact: 'SparePartsContact',
    VisitingOfficeContact: 'VisitingOfficeContact'
  }
}