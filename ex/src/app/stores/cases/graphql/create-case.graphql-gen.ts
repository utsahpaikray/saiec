import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { CaseDetailsFragmentDoc } from './case-details.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateCaseMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  description: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
  assetSystemComponentId?: Types.InputMaybe<Types.Scalars['String']>;
  eventSource: Types.Source;
  createCaseContactPerson: Types.CreateCaseContactPersonInput;
  attachments: Array<Types.CreateCaseAttachmentInput> | Types.CreateCaseAttachmentInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutation', createCase: { __typename?: 'Case', id: any, dateTimeCreated: any, assetSystemComponentId?: string | null, title: string, description?: string | null, status: Types.CaseStatus, source: Types.Source, referenceId?: string | null, messages: Array<{ __typename?: 'Message', id: any, dateTimeCreated: any, content: string, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, attachments: Array<{ __typename?: 'Attachment', id: any, name: string, description: string, dateTimeCreated: any, contentType: string, ThumbnailUrlWithToken?: string | null, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null, contactPerson?: { __typename?: 'ContactPerson', samAccountName: string, emailAddress: string, name: string } | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', id: any, dateTimeCreated: any, status: Types.CaseStatus, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }> } };

export const CreateCaseDocument = gql`
    mutation createCase($title: String!, $description: String!, $siteId: UUID!, $assetSystemComponentId: String, $eventSource: Source!, $createCaseContactPerson: CreateCaseContactPersonInput!, $attachments: [CreateCaseAttachmentInput!]!) {
  createCase(
    title: $title
    description: $description
    siteId: $siteId
    assetSystemComponentId: $assetSystemComponentId
    source: $eventSource
    createCaseContactPerson: $createCaseContactPerson
    attachments: $attachments
  ) {
    ...CaseDetails
  }
}
    ${CaseDetailsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCaseGQL extends Apollo.Mutation<CreateCaseMutation, CreateCaseMutationVariables> {
    document = CreateCaseDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    createCase: 'createCase'
  }
}