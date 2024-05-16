import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { CertificationPathItemFragmentDoc } from './cms-shared-trainings-fragment.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CertificationPathByTrainingIdsQueryVariables = Types.Exact<{
  trainingIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type CertificationPathByTrainingIdsQuery = { __typename?: 'Query', trainingCollection?: { __typename?: 'TrainingCollection', items: Array<{ __typename?: 'Training', linkedFrom?: { __typename?: 'TrainingLinkingCollections', certificationPathCollection?: { __typename?: 'CertificationPathCollection', items: Array<{ __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null };

export const CertificationPathByTrainingIdsDocument = gql`
    query certificationPathByTrainingIds($trainingIds: [String]) {
  trainingCollection(where: {sys: {id_in: $trainingIds}}) {
    items {
      linkedFrom {
        certificationPathCollection(limit: 3) {
          items {
            ...CertificationPathItem
          }
        }
      }
    }
  }
}
    ${CertificationPathItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CertificationPathByTrainingIdsGQL extends Apollo.Query<CertificationPathByTrainingIdsQuery, CertificationPathByTrainingIdsQueryVariables> {
    document = CertificationPathByTrainingIdsDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    certificationPathByTrainingIds: 'certificationPathByTrainingIds'
  }
}