import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AddAttachmentToCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
  attachmentName: Types.Scalars['String'];
  attachmentDescription: Types.Scalars['String'];
  attachmentPayloadBase64: Types.Scalars['String'];
}>;


export type AddAttachmentToCaseMutation = { __typename?: 'Mutation', addAttachmentToCase: boolean };

export const AddAttachmentToCaseDocument = gql`
    mutation addAttachmentToCase($caseId: UUID!, $attachmentName: String!, $attachmentDescription: String!, $attachmentPayloadBase64: String!) {
  addAttachmentToCase(
    caseId: $caseId
    attachmentName: $attachmentName
    attachmentDescription: $attachmentDescription
    attachmentPayloadBase64: $attachmentPayloadBase64
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddAttachmentToCaseGQL extends Apollo.Mutation<AddAttachmentToCaseMutation, AddAttachmentToCaseMutationVariables> {
    document = AddAttachmentToCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    addAttachmentToCase: 'addAttachmentToCase'
  }
}