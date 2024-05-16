import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssetBySystemComponentIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  systemComponentId: Types.Scalars['String'];
}>;


export type AssetBySystemComponentIdQuery = { __typename?: 'Query', assetBySystemComponentId?: { __typename?: 'Asset', systemComponentId: string, description: string, markCode?: string | null, markNumber?: string | null } | null };

export const AssetBySystemComponentIdDocument = gql`
    query assetBySystemComponentId($siteId: UUID!, $systemComponentId: String!) {
  assetBySystemComponentId(siteId: $siteId, systemComponentId: $systemComponentId) {
    systemComponentId
    description
    markCode
    markNumber
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssetBySystemComponentIdGQL extends Apollo.Query<AssetBySystemComponentIdQuery, AssetBySystemComponentIdQueryVariables> {
    document = AssetBySystemComponentIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    assetBySystemComponentId: 'assetBySystemComponentId'
  }
}