import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentationSettingsCategoriesQueryVariables = Types.Exact<{
  culture?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type DocumentationSettingsCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: any, codeName: string, categoryCultures: Array<{ __typename?: 'CategoryCulture', name: string }> }> };

export const DocumentationSettingsCategoriesDocument = gql`
    query documentationSettingsCategories($culture: String) {
  categories {
    id
    codeName
    categoryCultures(where: {culture: {eq: $culture}}) {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentationSettingsCategoriesGQL extends Apollo.Query<DocumentationSettingsCategoriesQuery, DocumentationSettingsCategoriesQueryVariables> {
    document = DocumentationSettingsCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentationSettingsCategories: 'documentationSettingsCategories'
  }
}