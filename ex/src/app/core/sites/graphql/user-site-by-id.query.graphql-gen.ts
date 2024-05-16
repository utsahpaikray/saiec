import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { SitePortalFragmentDoc } from './shared-site-fragments.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserSiteByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type UserSiteByIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', name: string, portal: { __typename?: 'Portal', name: string, id: any } }> } | null } };

export const UserSiteByIdDocument = gql`
    query userSiteById($id: UUID) {
  me {
    relatedPortalData {
      sites(where: {id: {eq: $id}}) {
        name
        ...SitePortal
      }
    }
  }
}
    ${SitePortalFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSiteByIdGQL extends Apollo.Query<UserSiteByIdQuery, UserSiteByIdQueryVariables> {
    document = UserSiteByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSiteById: 'userSiteById'
  }
}