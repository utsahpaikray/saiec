import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type PortalDetailGuardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PortalDetailGuardQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', id: any }> };

export const PortalDetailGuardDocument = gql`
    query portalDetailGuard {
  portals {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PortalDetailGuardGQL extends Apollo.Query<PortalDetailGuardQuery, PortalDetailGuardQueryVariables> {
    document = PortalDetailGuardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    portalDetailGuard: 'portalDetailGuard'
  }
}