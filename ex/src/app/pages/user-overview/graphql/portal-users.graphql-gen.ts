import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type PortalUserFragment = { __typename?: 'Portal_usersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'Portal_usersEdge', cursor: string, node: { __typename?: 'RelatedPortalData', relatedIdentityData?: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, email?: string | null, customerEmail?: string | null, id?: any | null } | null } }> | null };

export type PortalUsersQueryVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PortalUsersQuery = { __typename?: 'Query', portal_users?: { __typename?: 'Portal_usersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'Portal_usersEdge', cursor: string, node: { __typename?: 'RelatedPortalData', relatedIdentityData?: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, email?: string | null, customerEmail?: string | null, id?: any | null } | null } }> | null } | null };

export const PortalUserFragmentDoc = gql`
    fragment PortalUser on Portal_usersConnection {
  totalCount
  pageInfo {
    hasNextPage
    hasPreviousPage
  }
  edges {
    cursor
    node {
      relatedIdentityData {
        firstName
        lastName
        email
        customerEmail
        id
      }
    }
  }
}
    `;
export const PortalUsersDocument = gql`
    query portalUsers($portalId: UUID!, $cursor: String) {
  portal_users(
    first: 15
    after: $cursor
    where: {portals: {some: {id: {eq: $portalId}}}}
  ) {
    ...PortalUser
  }
}
    ${PortalUserFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PortalUsersGQL extends Apollo.Query<PortalUsersQuery, PortalUsersQueryVariables> {
    document = PortalUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    portalUsers: 'portalUsers'
  },
  Fragment: {
    PortalUser: 'PortalUser'
  }
}