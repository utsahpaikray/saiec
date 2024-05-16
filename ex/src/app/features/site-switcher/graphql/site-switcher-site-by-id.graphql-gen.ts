import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteSwitcherSiteFragment = { __typename?: 'Site', portal: { __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> } };

export type SiteSwitcherSiteByIdQueryVariables = Types.Exact<{
  siteId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SiteSwitcherSiteByIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', portal: { __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> } }> };

export const SiteSwitcherSiteFragmentDoc = gql`
    fragment SiteSwitcherSite on Site {
  portal {
    name
    id
    sites {
      id
      name
    }
  }
}
    `;
export const SiteSwitcherSiteByIdDocument = gql`
    query siteSwitcherSiteById($siteId: UUID) {
  sites(where: {id: {eq: $siteId}}) {
    ...SiteSwitcherSite
  }
}
    ${SiteSwitcherSiteFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteSwitcherSiteByIdGQL extends Apollo.Query<SiteSwitcherSiteByIdQuery, SiteSwitcherSiteByIdQueryVariables> {
    document = SiteSwitcherSiteByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteSwitcherSiteById: 'siteSwitcherSiteById'
  },
  Fragment: {
    SiteSwitcherSite: 'SiteSwitcherSite'
  }
}