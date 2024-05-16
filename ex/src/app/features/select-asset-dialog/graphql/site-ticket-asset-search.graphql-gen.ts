import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { SiteTicketAssetFragmentDoc } from '../../../pages/ticket/graphql/site-ticket-asset-by-component-id.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteTicketAssetSearchQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  searchText: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SiteTicketAssetSearchQuery = { __typename?: 'Query', assetSearch?: { __typename?: 'AssetSearchCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Asset', description: string, siteId: string, markCode?: string | null, markNumber?: string | null, customerNumber?: string | null, systemComponentId: string }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export const SiteTicketAssetSearchDocument = gql`
    query siteTicketAssetSearch($siteId: UUID!, $searchText: String!, $skip: Int) {
  assetSearch(siteId: $siteId, searchText: $searchText, take: 15, skip: $skip) {
    items {
      ...siteTicketAsset
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}
    ${SiteTicketAssetFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteTicketAssetSearchGQL extends Apollo.Query<SiteTicketAssetSearchQuery, SiteTicketAssetSearchQueryVariables> {
    document = SiteTicketAssetSearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteTicketAssetSearch: 'siteTicketAssetSearch'
  }
}