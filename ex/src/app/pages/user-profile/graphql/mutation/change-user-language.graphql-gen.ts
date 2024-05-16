import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ChangeUserLanguageMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  language: Types.Scalars['String'];
}>;


export type ChangeUserLanguageMutation = { __typename?: 'Mutation', changeUserLanguage: boolean };

export const ChangeUserLanguageDocument = gql`
    mutation changeUserLanguage($userId: UUID!, $language: String!) {
  changeUserLanguage(userId: $userId, language: $language)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChangeUserLanguageGQL extends Apollo.Mutation<ChangeUserLanguageMutation, ChangeUserLanguageMutationVariables> {
    document = ChangeUserLanguageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    changeUserLanguage: 'changeUserLanguage'
  }
}