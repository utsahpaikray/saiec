import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RequestTrainingMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  trainingRequest: Types.TrainingRequestInput;
}>;


export type RequestTrainingMutation = { __typename?: 'Mutation', requestTraining: boolean };

export const RequestTrainingDocument = gql`
    mutation requestTraining($siteId: UUID!, $trainingRequest: TrainingRequestInput!) {
  requestTraining(siteId: $siteId, trainingRequest: $trainingRequest)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RequestTrainingGQL extends Apollo.Mutation<RequestTrainingMutation, RequestTrainingMutationVariables> {
    document = RequestTrainingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    requestTraining: 'requestTraining'
  }
}