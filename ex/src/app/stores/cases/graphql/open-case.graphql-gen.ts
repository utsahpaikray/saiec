import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type OpenCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type OpenCaseMutation = { __typename?: 'Mutation', openCase: boolean };

export const OpenCaseDocument = gql`
    mutation openCase($caseId: UUID!) {
  openCase(caseId: $caseId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OpenCaseGQL extends Apollo.Mutation<OpenCaseMutation, OpenCaseMutationVariables> {
    document = OpenCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    openCase: 'openCase'
  }
}