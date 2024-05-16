import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SitesByPortalIdQueryVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
}>;


export type SitesByPortalIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } };

export const SitesByPortalIdDocument = gql`
    query sitesByPortalId($portalId: UUID!) {
  me {
    relatedPortalData {
      AccessibleSites(where: {portalId: {eq: $portalId}}) {
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
  export class SitesByPortalIdGQL extends Apollo.Query<SitesByPortalIdQuery, SitesByPortalIdQueryVariables> {
    document = SitesByPortalIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    sitesByPortalId: 'sitesByPortalId'
  }
}