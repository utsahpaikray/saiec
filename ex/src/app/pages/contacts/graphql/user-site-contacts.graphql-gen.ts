import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { AccountManagerContactFragmentDoc, ContractManagerContactFragmentDoc, ItManagerContactFragmentDoc, ServiceDeskContactFragmentDoc, SparePartsContactFragmentDoc, VisitingOfficeContactFragmentDoc } from '../../../core/sites/graphql/contacts-by-site-id.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserSiteContactQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteContactQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', accountManagerContact: { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, contractManagerContact: { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null }, itManagerContact: { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, serviceDeskContact: { __typename?: 'ServiceDeskContact', name?: string | null, phoneNumber?: string | null, emailAddress?: string | null, alternativeContactTitle?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean }, sparePartsContact: { __typename?: 'SparePartsContact', emailAddress?: string | null, alternativeContactTitle?: string | null, show: boolean }, visitingOfficeContact: { __typename?: 'VisitingOfficeContact', name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, alternativeContactTitle?: string | null, show: boolean } }> } | null } };

export const UserSiteContactDocument = gql`
    query userSiteContact($siteId: UUID!) {
  me {
    relatedPortalData {
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
  export class UserSiteContactGQL extends Apollo.Query<UserSiteContactQuery, UserSiteContactQueryVariables> {
    document = UserSiteContactDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSiteContact: 'userSiteContact'
  }
}