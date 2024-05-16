import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteWarrantyItemFragment = { __typename?: 'Asset', description: string, itemNumber?: string | null, systemComponentId: string, classificationLevel1?: string | null, classificationLevel2?: string | null, classificationLevel3?: string | null, classificationLevel4?: string | null, classificationLevel5?: string | null, sparePartCategory?: string | null };

export type SiteWarrantyItemSearchQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  searchText: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SiteWarrantyItemSearchQuery = { __typename?: 'Query', itemSearch?: { __typename?: 'ItemSearchCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean }, items?: Array<{ __typename?: 'Asset', description: string, itemNumber?: string | null, systemComponentId: string, classificationLevel1?: string | null, classificationLevel2?: string | null, classificationLevel3?: string | null, classificationLevel4?: string | null, classificationLevel5?: string | null, sparePartCategory?: string | null }> | null } | null };

export const SiteWarrantyItemFragmentDoc = gql`
    fragment siteWarrantyItem on Asset {
  description
  itemNumber
  systemComponentId
  classificationLevel1
  classificationLevel2
  classificationLevel3
  classificationLevel4
  classificationLevel5
  sparePartCategory
}
    `;
export const SiteWarrantyItemSearchDocument = gql`
    query siteWarrantyItemSearch($siteId: UUID!, $searchText: String!, $skip: Int) {
  itemSearch(siteId: $siteId, searchText: $searchText, skip: $skip, take: 15) {
    pageInfo {
      hasNextPage
    }
    items {
      ...siteWarrantyItem
    }
    totalCount
  }
}
    ${SiteWarrantyItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteWarrantyItemSearchGQL extends Apollo.Query<SiteWarrantyItemSearchQuery, SiteWarrantyItemSearchQueryVariables> {
    document = SiteWarrantyItemSearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteWarrantyItemSearch: 'siteWarrantyItemSearch'
  },
  Fragment: {
    siteWarrantyItem: 'siteWarrantyItem'
  }
}