import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { SitePortalFragmentDoc } from './shared-site-fragments.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SiteByIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', name: string, portal: { __typename?: 'Portal', name: string, id: any } }> };

export const SiteByIdDocument = gql`
    query siteById($id: UUID) {
  sites(where: {id: {eq: $id}}) {
    name
    ...SitePortal
  }
}
    ${SitePortalFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteByIdGQL extends Apollo.Query<SiteByIdQuery, SiteByIdQueryVariables> {
    document = SiteByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteById: 'siteById'
  }
}