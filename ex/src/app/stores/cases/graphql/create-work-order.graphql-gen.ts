import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateWorkOrderMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type CreateWorkOrderMutation = { __typename?: 'Mutation', promoteToWorkOrder: boolean };

export const CreateWorkOrderDocument = gql`
    mutation createWorkOrder($caseId: UUID!) {
  promoteToWorkOrder(caseId: $caseId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateWorkOrderGQL extends Apollo.Mutation<CreateWorkOrderMutation, CreateWorkOrderMutationVariables> {
    document = CreateWorkOrderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    createWorkOrder: 'createWorkOrder'
  }
}