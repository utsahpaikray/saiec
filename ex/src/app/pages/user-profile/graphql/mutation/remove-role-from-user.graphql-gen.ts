import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RemoveRoleFromUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  roleId: Types.Scalars['UUID'];
}>;


export type RemoveRoleFromUserMutation = { __typename?: 'Mutation', removeRoleFromUser: boolean };

export const RemoveRoleFromUserDocument = gql`
    mutation removeRoleFromUser($userId: UUID!, $roleId: UUID!) {
  removeRoleFromUser(userId: $userId, roleId: $roleId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveRoleFromUserGQL extends Apollo.Mutation<RemoveRoleFromUserMutation, RemoveRoleFromUserMutationVariables> {
    document = RemoveRoleFromUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    removeRoleFromUser: 'removeRoleFromUser'
  }
}