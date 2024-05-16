import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { CertificationPathItemFragmentDoc } from './cms-shared-trainings-fragment.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AssortedTrainingItemByCertificationPathFragment = { __typename?: 'Training', title?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string } };

export type CertificationPathWithAssortedTrainingFragment = { __typename?: 'CertificationPath', title?: string | null, description?: string | null, trainingsCollection?: { __typename?: 'CertificationPathTrainingsCollection', items: Array<{ __typename?: 'Training', title?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string } };

export type AssortedTrainingsByCertificationPathQueryVariables = Types.Exact<{
  certificationPathId: Types.Scalars['String'];
  assortedTrainingIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type AssortedTrainingsByCertificationPathQuery = { __typename?: 'Query', certificationPath?: { __typename?: 'CertificationPath', title?: string | null, description?: string | null, trainingsCollection?: { __typename?: 'CertificationPathTrainingsCollection', items: Array<{ __typename?: 'Training', title?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null, sys: { __typename?: 'Sys', id: string } } | null };

export const AssortedTrainingItemByCertificationPathFragmentDoc = gql`
    fragment AssortedTrainingItemByCertificationPath on Training {
  title
  targetGroup
  duration
  sys {
    id
  }
}
    `;
export const CertificationPathWithAssortedTrainingFragmentDoc = gql`
    fragment CertificationPathWithAssortedTraining on CertificationPath {
  ...CertificationPathItem
  trainingsCollection(where: {sys: {id_in: $assortedTrainingIds}}) {
    items {
      ...AssortedTrainingItemByCertificationPath
    }
  }
}
    ${CertificationPathItemFragmentDoc}
${AssortedTrainingItemByCertificationPathFragmentDoc}`;
export const AssortedTrainingsByCertificationPathDocument = gql`
    query assortedTrainingsByCertificationPath($certificationPathId: String!, $assortedTrainingIds: [String]) {
  certificationPath(id: $certificationPathId) {
    ...CertificationPathWithAssortedTraining
  }
}
    ${CertificationPathWithAssortedTrainingFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AssortedTrainingsByCertificationPathGQL extends Apollo.Query<AssortedTrainingsByCertificationPathQuery, AssortedTrainingsByCertificationPathQueryVariables> {
    document = AssortedTrainingsByCertificationPathDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    assortedTrainingsByCertificationPath: 'assortedTrainingsByCertificationPath'
  },
  Fragment: {
    AssortedTrainingItemByCertificationPath: 'AssortedTrainingItemByCertificationPath',
    CertificationPathWithAssortedTraining: 'CertificationPathWithAssortedTraining'
  }
}