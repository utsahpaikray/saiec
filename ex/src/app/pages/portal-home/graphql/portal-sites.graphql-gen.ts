import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type PortalSitesQueryVariables = Types.Exact<{
  portalId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type PortalSitesQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> }> };

export const PortalSitesDocument = gql`
    query portalSites($portalId: UUID) {
  portals(where: {id: {eq: $portalId}}) {
    name
    id
    sites {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PortalSitesGQL extends Apollo.Query<PortalSitesQuery, PortalSitesQueryVariables> {
    document = PortalSitesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    portalSites: 'portalSites'
  }
}