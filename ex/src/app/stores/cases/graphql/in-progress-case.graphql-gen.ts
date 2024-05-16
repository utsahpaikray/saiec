import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type InProgressCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type InProgressCaseMutation = { __typename?: 'Mutation', inProgressCase: boolean };

export const InProgressCaseDocument = gql`
    mutation inProgressCase($caseId: UUID!) {
  inProgressCase(caseId: $caseId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InProgressCaseGQL extends Apollo.Mutation<InProgressCaseMutation, InProgressCaseMutationVariables> {
    document = InProgressCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    inProgressCase: 'inProgressCase'
  }
}