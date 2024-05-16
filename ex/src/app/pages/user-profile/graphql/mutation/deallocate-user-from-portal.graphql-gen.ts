import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DeallocateUserFromPortalMutationVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type DeallocateUserFromPortalMutation = { __typename?: 'Mutation', deallocateUserFromPortal: boolean };

export const DeallocateUserFromPortalDocument = gql`
    mutation deallocateUserFromPortal($portalId: UUID!, $userId: UUID!) {
  deallocateUserFromPortal(portalId: $portalId, userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeallocateUserFromPortalGQL extends Apollo.Mutation<DeallocateUserFromPortalMutation, DeallocateUserFromPortalMutationVariables> {
    document = DeallocateUserFromPortalDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    deallocateUserFromPortal: 'deallocateUserFromPortal'
  }
}