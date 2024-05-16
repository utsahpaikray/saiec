import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { TrainingImageFragmentDoc, CertificationPathItemFragmentDoc } from './cms-shared-trainings-fragment.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RecommendedAssortedTrainingItemFragment = { __typename?: 'Training', title?: string | null, description?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string }, cardImageCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null } | null> } | null, linkedFrom?: { __typename?: 'TrainingLinkingCollections', certificationPathCollection?: { __typename?: 'CertificationPathCollection', items: Array<{ __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null };

export type RecommendedAssortedTrainingQueryVariables = Types.Exact<{
  segment?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type RecommendedAssortedTrainingQuery = { __typename?: 'Query', assortmentCollection?: { __typename?: 'AssortmentCollection', items: Array<{ __typename?: 'Assortment', trainingsCollection?: { __typename?: 'AssortmentTrainingsCollection', items: Array<{ __typename?: 'Training', title?: string | null, description?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string }, cardImageCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null } | null> } | null, linkedFrom?: { __typename?: 'TrainingLinkingCollections', certificationPathCollection?: { __typename?: 'CertificationPathCollection', items: Array<{ __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null> } | null };

export const RecommendedAssortedTrainingItemFragmentDoc = gql`
    fragment RecommendedAssortedTrainingItem on Training {
  title
  description
  targetGroup
  duration
  sys {
    id
  }
  cardImageCollection {
    items {
      ...TrainingImage
    }
  }
  linkedFrom {
    certificationPathCollection {
      items {
        ...CertificationPathItem
      }
    }
  }
}
    ${TrainingImageFragmentDoc}
${CertificationPathItemFragmentDoc}`;
export const RecommendedAssortedTrainingDocument = gql`
    query recommendedAssortedTraining($segment: [String]) {
  assortmentCollection(where: {segment_contains_all: $segment}, limit: 1) {
    items {
      trainingsCollection(where: {recommended: true}, limit: 20) {
        items {
          ...RecommendedAssortedTrainingItem
        }
      }
    }
  }
}
    ${RecommendedAssortedTrainingItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RecommendedAssortedTrainingGQL extends Apollo.Query<RecommendedAssortedTrainingQuery, RecommendedAssortedTrainingQueryVariables> {
    document = RecommendedAssortedTrainingDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    recommendedAssortedTraining: 'recommendedAssortedTraining'
  },
  Fragment: {
    RecommendedAssortedTrainingItem: 'RecommendedAssortedTrainingItem'
  }
}