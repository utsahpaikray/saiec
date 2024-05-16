import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type MaximoUserApiKeyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MaximoUserApiKeyQuery = { __typename?: 'Query', maximoUserApiKey: string };

export const MaximoUserApiKeyDocument = gql`
    query maximoUserApiKey {
  maximoUserApiKey
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MaximoUserApiKeyGQL extends Apollo.Query<MaximoUserApiKeyQuery, MaximoUserApiKeyQueryVariables> {
    document = MaximoUserApiKeyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    maximoUserApiKey: 'maximoUserApiKey'
  }
}