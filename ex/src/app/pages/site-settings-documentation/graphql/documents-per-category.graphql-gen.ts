import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentationSettingsDocumentsPerCategoryQueryVariables = Types.Exact<{
  categoryCodeName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentationSettingsDocumentsPerCategoryQuery = { __typename?: 'Query', documentsBySite: Array<{ __typename?: 'BlobItem', name?: string | null, contentLength?: any | null, categoryCodeName: string, culture: string }> };

export const DocumentationSettingsDocumentsPerCategoryDocument = gql`
    query documentationSettingsDocumentsPerCategory($categoryCodeName: String!, $siteId: UUID!) {
  documentsBySite(siteId: $siteId, categoryCodeName: $categoryCodeName) {
    name
    contentLength
    categoryCodeName
    culture
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentationSettingsDocumentsPerCategoryGQL extends Apollo.Query<DocumentationSettingsDocumentsPerCategoryQuery, DocumentationSettingsDocumentsPerCategoryQueryVariables> {
    document = DocumentationSettingsDocumentsPerCategoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentationSettingsDocumentsPerCategory: 'documentationSettingsDocumentsPerCategory'
  }
}