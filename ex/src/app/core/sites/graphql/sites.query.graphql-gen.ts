import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AccessibleSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccessibleSitesQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } };

export type AllocatedSitesQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type AllocatedSitesQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AllocatedSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } | null };

export const AccessibleSitesDocument = gql`
    query accessibleSites {
  me {
    relatedPortalData {
      AccessibleSites {
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
  export class AccessibleSitesGQL extends Apollo.Query<AccessibleSitesQuery, AccessibleSitesQueryVariables> {
    document = AccessibleSitesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllocatedSitesDocument = gql`
    query allocatedSites($id: UUID!) {
  user(userId: $id) {
    relatedPortalData {
      AllocatedSites {
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
  export class AllocatedSitesGQL extends Apollo.Query<AllocatedSitesQuery, AllocatedSitesQueryVariables> {
    document = AllocatedSitesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    accessibleSites: 'accessibleSites',
    allocatedSites: 'allocatedSites'
  }
}