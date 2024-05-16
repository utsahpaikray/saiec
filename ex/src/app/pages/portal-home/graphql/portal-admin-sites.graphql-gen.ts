import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type PortalAdminSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PortalAdminSitesQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string, sites: Array<{ __typename?: 'Site', name: string, id: any }> }> } | null } };

export const PortalAdminSitesDocument = gql`
    query portalAdminSites {
  me {
    relatedPortalData {
      portals {
        id
        name
        sites {
          name
          id
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PortalAdminSitesGQL extends Apollo.Query<PortalAdminSitesQuery, PortalAdminSitesQueryVariables> {
    document = PortalAdminSitesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    portalAdminSites: 'portalAdminSites'
  }
}