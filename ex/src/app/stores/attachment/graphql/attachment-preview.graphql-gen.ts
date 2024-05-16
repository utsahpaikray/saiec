import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AttachmentPreviewQueryVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
  attachmentId: Types.Scalars['UUID'];
}>;


export type AttachmentPreviewQuery = { __typename?: 'Query', case?: { __typename?: 'Case', attachments: Array<{ __typename?: 'Attachment', id: any, name: string, contentType: string, UrlWithToken: string }> } | null };

export const AttachmentPreviewDocument = gql`
    query attachmentPreview($caseId: UUID!, $attachmentId: UUID!) {
  case(caseId: $caseId) {
    attachments(where: {id: {eq: $attachmentId}}) {
      id
      name
      contentType
      UrlWithToken
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AttachmentPreviewGQL extends Apollo.Query<AttachmentPreviewQuery, AttachmentPreviewQueryVariables> {
    document = AttachmentPreviewDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    attachmentPreview: 'attachmentPreview'
  }
}