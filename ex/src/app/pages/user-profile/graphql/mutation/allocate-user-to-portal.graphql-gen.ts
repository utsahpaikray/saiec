import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AllocateUserToPortalMutationVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type AllocateUserToPortalMutation = { __typename?: 'Mutation', allocateUserToPortal: boolean };

export const AllocateUserToPortalDocument = gql`
    mutation allocateUserToPortal($portalId: UUID!, $userId: UUID!) {
  allocateUserToPortal(portalId: $portalId, userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllocateUserToPortalGQL extends Apollo.Mutation<AllocateUserToPortalMutation, AllocateUserToPortalMutationVariables> {
    document = AllocateUserToPortalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    allocateUserToPortal: 'allocateUserToPortal'
  }
}