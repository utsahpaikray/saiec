import * as Types from '../../../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserByUsernameQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', userByUsername: { __typename?: 'IdentityUser', id?: any | null } };

export const UserByUsernameDocument = gql`
    query userByUsername($username: String!) {
  userByUsername(username: $username) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserByUsernameGQL extends Apollo.Query<UserByUsernameQuery, UserByUsernameQueryVariables> {
    document = UserByUsernameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userByUsername: 'userByUsername'
  }
}