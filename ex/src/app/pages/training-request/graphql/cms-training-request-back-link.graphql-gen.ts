import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TrainingRequestBackLinkQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type TrainingRequestBackLinkQuery = { __typename?: 'Query', training?: { __typename?: 'Training', title?: string | null, sys: { __typename?: 'Sys', id: string } } | null };

export const TrainingRequestBackLinkDocument = gql`
    query trainingRequestBackLink($id: String!) {
  training(id: $id) {
    sys {
      id
    }
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TrainingRequestBackLinkGQL extends Apollo.Query<TrainingRequestBackLinkQuery, TrainingRequestBackLinkQueryVariables> {
    document = TrainingRequestBackLinkDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    trainingRequestBackLink: 'trainingRequestBackLink'
  }
}