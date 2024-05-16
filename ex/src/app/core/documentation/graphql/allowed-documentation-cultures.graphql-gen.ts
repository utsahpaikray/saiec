import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentCultureFragment = { __typename?: 'CultureInfo', englishName: string, name: string };

export type AllowedDocumentationCulturesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllowedDocumentationCulturesQuery = { __typename?: 'Query', allowedDocumentationCultures: Array<{ __typename?: 'CultureInfo', englishName: string, name: string }> };

export const DocumentCultureFragmentDoc = gql`
    fragment documentCulture on CultureInfo {
  englishName
  name
}
    `;
export const AllowedDocumentationCulturesDocument = gql`
    query allowedDocumentationCultures {
  allowedDocumentationCultures {
    ...documentCulture
  }
}
    ${DocumentCultureFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AllowedDocumentationCulturesGQL extends Apollo.Query<AllowedDocumentationCulturesQuery, AllowedDocumentationCulturesQueryVariables> {
    document = AllowedDocumentationCulturesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    allowedDocumentationCultures: 'allowedDocumentationCultures'
  },
  Fragment: {
    documentCulture: 'documentCulture'
  }
}