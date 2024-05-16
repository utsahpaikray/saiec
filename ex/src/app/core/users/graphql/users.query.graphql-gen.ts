import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AllUsersQueryVariables = Types.Exact<{
  searchText?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, email?: string | null, customerEmail?: string | null, id?: any | null }> };

export const AllUsersDocument = gql`
    query allUsers($searchText: String) {
  users(search: $searchText) {
    firstName
    lastName
    prefix
    email
    customerEmail
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllUsersGQL extends Apollo.Query<AllUsersQuery, AllUsersQueryVariables> {
    document = AllUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    allUsers: 'allUsers'
  }
}