import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteMaximoAssetsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  searchText: Types.Scalars['String'];
  skip: Types.Scalars['Int'];
  take: Types.Scalars['Int'];
}>;


export type SiteMaximoAssetsQuery = { __typename?: 'Query', assetSearch?: { __typename?: 'AssetSearchCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean }, items?: Array<{ __typename?: 'Asset', systemComponentId: string, description: string, markCode?: string | null, markNumber?: string | null }> | null } | null };

export const SiteMaximoAssetsDocument = gql`
    query siteMaximoAssets($siteId: UUID!, $searchText: String!, $skip: Int!, $take: Int!) {
  assetSearch(siteId: $siteId, searchText: $searchText, skip: $skip, take: $take) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    items {
      systemComponentId
      description
      markCode
      markNumber
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteMaximoAssetsGQL extends Apollo.Query<SiteMaximoAssetsQuery, SiteMaximoAssetsQueryVariables> {
    document = SiteMaximoAssetsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteMaximoAssets: 'siteMaximoAssets'
  }
}