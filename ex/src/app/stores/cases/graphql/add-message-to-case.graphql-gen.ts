import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AddMessageToCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
  content: Types.Scalars['String'];
}>;


export type AddMessageToCaseMutation = { __typename?: 'Mutation', addMessageToCase: boolean };

export const AddMessageToCaseDocument = gql`
    mutation addMessageToCase($caseId: UUID!, $content: String!) {
  addMessageToCase(caseId: $caseId, content: $content)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddMessageToCaseGQL extends Apollo.Mutation<AddMessageToCaseMutation, AddMessageToCaseMutationVariables> {
    document = AddMessageToCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    addMessageToCase: 'addMessageToCase'
  }
}