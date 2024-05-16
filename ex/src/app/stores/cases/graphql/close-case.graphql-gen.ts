import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CloseCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type CloseCaseMutation = { __typename?: 'Mutation', closeCase: boolean };

export const CloseCaseDocument = gql`
    mutation closeCase($caseId: UUID!) {
  closeCase(caseId: $caseId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CloseCaseGQL extends Apollo.Mutation<CloseCaseMutation, CloseCaseMutationVariables> {
    document = CloseCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    closeCase: 'closeCase'
  }
}