import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { TrainingImageFragmentDoc, CertificationPathItemFragmentDoc } from '../../../core/cms-training-assortments/graphql/cms-shared-trainings-fragment.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TrainingDetailItemFragment = { __typename?: 'Training', title?: string | null, description?: string | null, introduction?: string | null, entryRequirements?: string | null, duration?: string | null, targetGroup?: string | null, sys: { __typename?: 'Sys', id: string }, learningObjectives?: { __typename?: 'TrainingLearningObjectives', json: any } | null, trainingModulesCollection?: { __typename?: 'TrainingTrainingModulesCollection', items: Array<{ __typename?: 'TrainingModule', title?: string | null, description?: string | null, optionalModule?: boolean | null } | null> } | null, pageImageCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null } | null> } | null };

export type TrainingDetailModuleFragment = { __typename?: 'TrainingModule', title?: string | null, description?: string | null, optionalModule?: boolean | null };

export type TrainingDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type TrainingDetailQuery = { __typename?: 'Query', training?: { __typename?: 'Training', title?: string | null, description?: string | null, introduction?: string | null, entryRequirements?: string | null, duration?: string | null, targetGroup?: string | null, sys: { __typename?: 'Sys', id: string }, learningObjectives?: { __typename?: 'TrainingLearningObjectives', json: any } | null, trainingModulesCollection?: { __typename?: 'TrainingTrainingModulesCollection', items: Array<{ __typename?: 'TrainingModule', title?: string | null, description?: string | null, optionalModule?: boolean | null } | null> } | null, pageImageCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null } | null> } | null } | null };

export const TrainingDetailModuleFragmentDoc = gql`
    fragment TrainingDetailModule on TrainingModule {
  title
  description
  optionalModule
}
    `;
export const TrainingDetailItemFragmentDoc = gql`
    fragment TrainingDetailItem on Training {
  sys {
    id
  }
  title
  description
  introduction
  entryRequirements
  learningObjectives {
    json
  }
  duration
  targetGroup
  trainingModulesCollection {
    items {
      ...TrainingDetailModule
    }
  }
  pageImageCollection {
    items {
      ...TrainingImage
    }
  }
}
    ${TrainingDetailModuleFragmentDoc}
${TrainingImageFragmentDoc}`;
export const TrainingDetailDocument = gql`
    query trainingDetail($id: String!) {
  training(id: $id) {
    ...TrainingDetailItem
  }
}
    ${TrainingDetailItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TrainingDetailGQL extends Apollo.Query<TrainingDetailQuery, TrainingDetailQueryVariables> {
    document = TrainingDetailDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    trainingDetail: 'trainingDetail'
  },
  Fragment: {
    TrainingDetailItem: 'TrainingDetailItem',
    TrainingDetailModule: 'TrainingDetailModule'
  }
}