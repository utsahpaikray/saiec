import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserRoleFragment = { __typename?: 'Role', id: any, name: string };

export type UserFragment = { __typename?: 'IdentityUser', id?: any | null };

export type UserAuthorizationQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
}>;


export type UserAuthorizationQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', id?: any | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, assignableRoles: Array<{ __typename?: 'Role', id: any, name: string }> } | null };

export const UserRoleFragmentDoc = gql`
    fragment UserRole on Role {
  id
  name
}
    `;
export const UserFragmentDoc = gql`
    fragment User on IdentityUser {
  id
}
    `;
export const UserAuthorizationDocument = gql`
    query userAuthorization($userId: UUID!) {
  user(userId: $userId) {
    ...User
    roles {
      ...UserRole
    }
    assignableRoles {
      ...UserRole
    }
  }
}
    ${UserFragmentDoc}
${UserRoleFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserAuthorizationGQL extends Apollo.Query<UserAuthorizationQuery, UserAuthorizationQueryVariables> {
    document = UserAuthorizationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userAuthorization: 'userAuthorization'
  },
  Fragment: {
    UserRole: 'UserRole',
    User: 'User'
  }
}