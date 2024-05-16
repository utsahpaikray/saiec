import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AllocateUserToSiteMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type AllocateUserToSiteMutation = { __typename?: 'Mutation', allocateUserToSite: boolean };

export const AllocateUserToSiteDocument = gql`
    mutation allocateUserToSite($siteId: UUID!, $userId: UUID!) {
  allocateUserToSite(siteId: $siteId, userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllocateUserToSiteGQL extends Apollo.Mutation<AllocateUserToSiteMutation, AllocateUserToSiteMutationVariables> {
    document = AllocateUserToSiteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    allocateUserToSite: 'allocateUserToSite'
  }
}