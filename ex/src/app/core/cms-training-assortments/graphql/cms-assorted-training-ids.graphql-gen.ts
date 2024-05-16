import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssortedTrainingIdsQueryVariables = Types.Exact<{
  segment?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type AssortedTrainingIdsQuery = { __typename?: 'Query', assortmentCollection?: { __typename?: 'AssortmentCollection', items: Array<{ __typename?: 'Assortment', trainingsCollection?: { __typename?: 'AssortmentTrainingsCollection', items: Array<{ __typename?: 'Training', sys: { __typename?: 'Sys', id: string } } | null> } | null } | null> } | null };

export const AssortedTrainingIdsDocument = gql`
    query assortedTrainingIds($segment: [String]) {
  assortmentCollection(where: {segment_contains_all: $segment}, limit: 1) {
    items {
      trainingsCollection {
        items {
          sys {
            id
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AssortedTrainingIdsGQL extends Apollo.Query<AssortedTrainingIdsQuery, AssortedTrainingIdsQueryVariables> {
    document = AssortedTrainingIdsDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    assortedTrainingIds: 'assortedTrainingIds'
  }
}