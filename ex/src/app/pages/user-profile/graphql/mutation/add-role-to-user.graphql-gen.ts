import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AddRoleToUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  roleId: Types.Scalars['UUID'];
}>;


export type AddRoleToUserMutation = { __typename?: 'Mutation', addRoleToUser: boolean };

export const AddRoleToUserDocument = gql`
    mutation addRoleToUser($userId: UUID!, $roleId: UUID!) {
  addRoleToUser(userId: $userId, roleId: $roleId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddRoleToUserGQL extends Apollo.Mutation<AddRoleToUserMutation, AddRoleToUserMutationVariables> {
    document = AddRoleToUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    addRoleToUser: 'addRoleToUser'
  }
}