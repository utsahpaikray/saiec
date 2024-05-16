import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { CertificationPathItemFragmentDoc } from '../../../core/cms-training-assortments/graphql/cms-shared-trainings-fragment.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TrainingDetailCertificationPathQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type TrainingDetailCertificationPathQuery = { __typename?: 'Query', certificationPath?: { __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string } } | null };

export const TrainingDetailCertificationPathDocument = gql`
    query trainingDetailCertificationPath($id: String!) {
  certificationPath(id: $id) {
    ...CertificationPathItem
  }
}
    ${CertificationPathItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TrainingDetailCertificationPathGQL extends Apollo.Query<TrainingDetailCertificationPathQuery, TrainingDetailCertificationPathQueryVariables> {
    document = TrainingDetailCertificationPathDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    trainingDetailCertificationPath: 'trainingDetailCertificationPath'
  }
}