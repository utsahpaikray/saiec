import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserSiteContractManagerQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteContractManagerQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', contractManagerContact: { __typename?: 'ContractManagerContact', emailAddress?: string | null } }> } | null } };

export const UserSiteContractManagerDocument = gql`
    query userSiteContractManager($siteId: UUID!) {
  me {
    relatedPortalData {
      sites(where: {id: {eq: $siteId}}) {
        contractManagerContact {
          emailAddress
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSiteContractManagerGQL extends Apollo.Query<UserSiteContractManagerQuery, UserSiteContractManagerQueryVariables> {
    document = UserSiteContractManagerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSiteContractManager: 'userSiteContractManager'
  }
}