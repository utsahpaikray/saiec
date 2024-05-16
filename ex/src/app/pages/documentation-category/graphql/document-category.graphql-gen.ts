import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentCategoryQueryVariables = Types.Exact<{
  categoryCodeName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentCategoryQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', codeName: string, categoryCultures: Array<{ __typename?: 'CategoryCulture', name: string, culture: string }> }>, documentsBySite: Array<{ __typename?: 'BlobItem', name?: string | null, contentLength?: any | null, culture: string }> };

export const DocumentCategoryDocument = gql`
    query documentCategory($categoryCodeName: String!, $siteId: UUID!) {
  categories(where: {codeName: {eq: $categoryCodeName}}) {
    codeName
    categoryCultures {
      name
      culture
    }
  }
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
  export class DocumentCategoryGQL extends Apollo.Query<DocumentCategoryQuery, DocumentCategoryQueryVariables> {
    document = DocumentCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentCategory: 'documentCategory'
  }
}