import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type PortalRelatedToSiteQueryVariables = Types.Exact<{
  siteId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type PortalRelatedToSiteQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessiblePortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } };

export const PortalRelatedToSiteDocument = gql`
    query portalRelatedToSite($siteId: UUID) {
  me {
    relatedPortalData {
      AccessiblePortals(where: {sites: {some: {id: {eq: $siteId}}}}) {
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
  export class PortalRelatedToSiteGQL extends Apollo.Query<PortalRelatedToSiteQuery, PortalRelatedToSiteQueryVariables> {
    document = PortalRelatedToSiteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    portalRelatedToSite: 'portalRelatedToSite'
  }
}