import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RejectCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type RejectCaseMutation = { __typename?: 'Mutation', rejectCase: boolean };

export const RejectCaseDocument = gql`
    mutation rejectCase($caseId: UUID!) {
  rejectCase(caseId: $caseId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RejectCaseGQL extends Apollo.Mutation<RejectCaseMutation, RejectCaseMutationVariables> {
    document = RejectCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    rejectCase: 'rejectCase'
  }
}