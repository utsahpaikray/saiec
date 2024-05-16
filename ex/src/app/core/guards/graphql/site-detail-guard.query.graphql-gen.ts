import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteDetailGuardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SiteDetailGuardQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', id: any, portal: { __typename?: 'Portal', id: any } }> };

export const SiteDetailGuardDocument = gql`
    query siteDetailGuard {
  sites {
    id
    portal {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteDetailGuardGQL extends Apollo.Query<SiteDetailGuardQuery, SiteDetailGuardQueryVariables> {
    document = SiteDetailGuardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteDetailGuard: 'siteDetailGuard'
  }
}