import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { UserProfileFragmentDoc } from './user-profile.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type MyUserProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyUserProfileQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, email?: string | null, id?: any | null, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', id: any }> } | null } };

export const MyUserProfileDocument = gql`
    query myUserProfile {
  me {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MyUserProfileGQL extends Apollo.Query<MyUserProfileQuery, MyUserProfileQueryVariables> {
    document = MyUserProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    myUserProfile: 'myUserProfile'
  }
}