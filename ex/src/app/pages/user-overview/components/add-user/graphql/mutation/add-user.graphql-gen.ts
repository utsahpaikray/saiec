import * as Types from '../../../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AddUserMutationVariables = Types.Exact<{
  upn: Types.Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: boolean };

export const AddUserDocument = gql`
    mutation addUser($upn: String!) {
  addUser(upn: $upn)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddUserGQL extends Apollo.Mutation<AddUserMutation, AddUserMutationVariables> {
    document = AddUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    addUser: 'addUser'
  }
}