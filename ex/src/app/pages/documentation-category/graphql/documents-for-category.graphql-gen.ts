import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentsForCategoryQueryVariables = Types.Exact<{
  categoryCodeName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentsForCategoryQuery = { __typename?: 'Query', documentsBySite: Array<{ __typename?: 'BlobItem', name?: string | null, contentLength?: any | null, culture: string }> };

export const DocumentsForCategoryDocument = gql`
    query documentsForCategory($categoryCodeName: String!, $siteId: UUID!) {
  documentsBySite(siteId: $siteId, categoryCodeName: $categoryCodeName) {
    name
    contentLength
    culture
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentsForCategoryGQL extends Apollo.Query<DocumentsForCategoryQuery, DocumentsForCategoryQueryVariables> {
    document = DocumentsForCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentsForCategory: 'documentsForCategory'
  }
}