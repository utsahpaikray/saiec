import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CurrentUserFragment = { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, customerEmail?: string | null, email?: string | null, id?: any | null, userType: Types.UserType, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', name: string, id: any, portal: { __typename?: 'Portal', id: any, name: string } }> } | null };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, customerEmail?: string | null, email?: string | null, id?: any | null, userType: Types.UserType, language?: string | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string }>, sites: Array<{ __typename?: 'Site', name: string, id: any, portal: { __typename?: 'Portal', id: any, name: string } }> } | null } };

export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on IdentityUser {
  firstName
  lastName
  prefix
  customerEmail
  email
  id
  userType
  roles {
    id
    name
  }
  language
  relatedPortalData {
    portals {
      id
      name
    }
    sites {
      name
      id
      portal {
        id
        name
      }
    }
  }
}
    `;
export const CurrentUserDocument = gql`
    query currentUser {
  me {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CurrentUserGQL extends Apollo.Query<CurrentUserQuery, CurrentUserQueryVariables> {
    document = CurrentUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    currentUser: 'currentUser'
  },
  Fragment: {
    CurrentUser: 'CurrentUser'
  }
}