import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteBySiteIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteBySiteIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } };

export const SiteBySiteIdDocument = gql`
    query siteBySiteId($siteId: UUID!) {
  me {
    relatedPortalData {
      AccessibleSites(where: {id: {eq: $siteId}}) {
        id
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteBySiteIdGQL extends Apollo.Query<SiteBySiteIdQuery, SiteBySiteIdQueryVariables> {
    document = SiteBySiteIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteBySiteId: 'siteBySiteId'
  }
}