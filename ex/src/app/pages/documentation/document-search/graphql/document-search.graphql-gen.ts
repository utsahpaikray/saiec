import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentSearchQueryVariables = Types.Exact<{
  searchString: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
  userCulture: Types.Scalars['String'];
  filters: Array<Types.DocumentSearchFilterInput> | Types.DocumentSearchFilterInput;
}>;


export type DocumentSearchQuery = { __typename?: 'Query', documentSearch: { __typename?: 'DocumentSearchResult', result: Array<{ __typename?: 'DocumentSearchResultItem', location: string, contentHighlights: Array<string>, metadata_storage_name: string, metadata_storage_size: number, storage_path: string, culture: string }> } };

export const DocumentSearchDocument = gql`
    query documentSearch($searchString: String!, $siteId: UUID!, $userCulture: String!, $filters: [DocumentSearchFilterInput!]!) {
  documentSearch(
    searchString: $searchString
    siteId: $siteId
    userCulture: $userCulture
    filters: $filters
  ) {
    result {
      location
      contentHighlights
      metadata_storage_name
      metadata_storage_size
      storage_path
      culture
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentSearchGQL extends Apollo.Query<DocumentSearchQuery, DocumentSearchQueryVariables> {
    document = DocumentSearchDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentSearch: 'documentSearch'
  }
}