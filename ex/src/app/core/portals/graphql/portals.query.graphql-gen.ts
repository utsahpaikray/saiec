import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AllPortalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPortalsQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', id: any, name: string }> };

export type AccessiblePortalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccessiblePortalsQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessiblePortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } };

export type PortalByPortalIdQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type PortalByPortalIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessiblePortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } };

export type AllocatedPortalsQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type AllocatedPortalsQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AllocatedPortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } | null };

export const AllPortalsDocument = gql`
    query allPortals {
  portals {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllPortalsGQL extends Apollo.Query<AllPortalsQuery, AllPortalsQueryVariables> {
    document = AllPortalsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AccessiblePortalsDocument = gql`
    query accessiblePortals {
  me {
    relatedPortalData {
      AccessiblePortals(where: {sites: {any: true}}) {
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
  export class AccessiblePortalsGQL extends Apollo.Query<AccessiblePortalsQuery, AccessiblePortalsQueryVariables> {
    document = AccessiblePortalsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PortalByPortalIdDocument = gql`
    query portalByPortalId($id: UUID!) {
  me {
    relatedPortalData {
      AccessiblePortals(where: {id: {eq: $id}}) {
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
  export class PortalByPortalIdGQL extends Apollo.Query<PortalByPortalIdQuery, PortalByPortalIdQueryVariables> {
    document = PortalByPortalIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllocatedPortalsDocument = gql`
    query allocatedPortals($id: UUID!) {
  user(userId: $id) {
    relatedPortalData {
      AllocatedPortals {
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
  export class AllocatedPortalsGQL extends Apollo.Query<AllocatedPortalsQuery, AllocatedPortalsQueryVariables> {
    document = AllocatedPortalsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    allPortals: 'allPortals',
    accessiblePortals: 'accessiblePortals',
    portalByPortalId: 'portalByPortalId',
    allocatedPortals: 'allocatedPortals'
  }
}