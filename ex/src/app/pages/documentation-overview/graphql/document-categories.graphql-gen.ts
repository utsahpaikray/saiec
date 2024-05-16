import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentCategoriesQueryVariables = Types.Exact<{
  culture?: Types.InputMaybe<Types.Scalars['String']>;
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentCategoriesQuery = { __typename?: 'Query', categoriesBySite: Array<string>, categories: Array<{ __typename?: 'Category', id: any, codeName: string, categoryCultures: Array<{ __typename?: 'CategoryCulture', name: string, culture: string, description: string }>, categoryAccesses: Array<{ __typename?: 'CategoryAccess', roleReference: string }> }> };

export const DocumentCategoriesDocument = gql`
    query documentCategories($culture: String, $siteId: UUID!) {
  categories(where: {categoryCultures: {some: {culture: {eq: $culture}}}}) {
    id
    codeName
    categoryCultures(where: {culture: {eq: $culture}}) {
      name
      culture
      description
    }
    categoryAccesses {
      roleReference
    }
  }
  categoriesBySite(siteId: $siteId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentCategoriesGQL extends Apollo.Query<DocumentCategoriesQuery, DocumentCategoriesQueryVariables> {
    document = DocumentCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentCategories: 'documentCategories'
  }
}