import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { CurrentUserFragmentDoc } from '../../../../core/current-user/graphql/current-user.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserProfilePortalFragment = { __typename?: 'Portal', id: any, name: string };

export type UserProfileFragment = { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, email?: string | null, id?: any | null, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', id: any }> } | null };

export type UserProfileQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
}>;


export type UserProfileQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, customerEmail?: string | null, email?: string | null, id?: any | null, userType: Types.UserType, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', name: string, id: any, portal: { __typename?: 'Portal', id: any, name: string } }> } | null } | null };

export const UserProfilePortalFragmentDoc = gql`
    fragment UserProfilePortal on Portal {
  id
  name
}
    `;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on IdentityUser {
  firstName
  lastName
  prefix
  email
  id
  roles {
    id
    name
  }
  language
  relatedPortalData {
    portals {
      ...UserProfilePortal
    }
    sites {
      id
    }
  }
}
    ${UserProfilePortalFragmentDoc}`;
export const UserProfileDocument = gql`
    query userProfile($userId: UUID!) {
  user(userId: $userId) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserProfileGQL extends Apollo.Query<UserProfileQuery, UserProfileQueryVariables> {
    document = UserProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userProfile: 'userProfile'
  },
  Fragment: {
    UserProfilePortal: 'UserProfilePortal',
    UserProfile: 'UserProfile'
  }
}