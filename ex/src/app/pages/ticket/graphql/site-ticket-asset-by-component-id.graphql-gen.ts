import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteTicketAssetFragment = { __typename?: 'Asset', description: string, siteId: string, markCode?: string | null, markNumber?: string | null, customerNumber?: string | null, systemComponentId: string };

export type SiteTicketAssetBySystemComponentIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  systemComponentId: Types.Scalars['String'];
}>;


export type SiteTicketAssetBySystemComponentIdQuery = { __typename?: 'Query', assetBySystemComponentId?: { __typename?: 'Asset', description: string, siteId: string, markCode?: string | null, markNumber?: string | null, customerNumber?: string | null, systemComponentId: string } | null };

export const SiteTicketAssetFragmentDoc = gql`
    fragment siteTicketAsset on Asset {
  description
  siteId
  markCode
  markNumber
  customerNumber
  systemComponentId
}
    `;
export const SiteTicketAssetBySystemComponentIdDocument = gql`
    query siteTicketAssetBySystemComponentId($siteId: UUID!, $systemComponentId: String!) {
  assetBySystemComponentId(siteId: $siteId, systemComponentId: $systemComponentId) {
    ...siteTicketAsset
  }
}
    ${SiteTicketAssetFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteTicketAssetBySystemComponentIdGQL extends Apollo.Query<SiteTicketAssetBySystemComponentIdQuery, SiteTicketAssetBySystemComponentIdQueryVariables> {
    document = SiteTicketAssetBySystemComponentIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteTicketAssetBySystemComponentId: 'siteTicketAssetBySystemComponentId'
  },
  Fragment: {
    siteTicketAsset: 'siteTicketAsset'
  }
}