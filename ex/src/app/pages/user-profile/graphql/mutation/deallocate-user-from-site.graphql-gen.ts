import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeallocateUserFromSiteMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type DeallocateUserFromSiteMutation = { __typename?: 'Mutation', deallocateUserFromSite: boolean };

export const DeallocateUserFromSiteDocument = gql`
    mutation deallocateUserFromSite($siteId: UUID!, $userId: UUID!) {
  deallocateUserFromSite(siteId: $siteId, userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeallocateUserFromSiteGQL extends Apollo.Mutation<DeallocateUserFromSiteMutation, DeallocateUserFromSiteMutationVariables> {
    document = DeallocateUserFromSiteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    deallocateUserFromSite: 'deallocateUserFromSite'
  }
}