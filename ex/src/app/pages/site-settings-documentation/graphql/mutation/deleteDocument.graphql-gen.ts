import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentationSettingsDeleteDocumentMutationVariables = Types.Exact<{
  documentName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentationSettingsDeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: boolean };

export const DocumentationSettingsDeleteDocumentDocument = gql`
    mutation documentationSettingsDeleteDocument($documentName: String!, $siteId: UUID!) {
  deleteDocument(documentName: $documentName, siteId: $siteId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentationSettingsDeleteDocumentGQL extends Apollo.Mutation<DocumentationSettingsDeleteDocumentMutation, DocumentationSettingsDeleteDocumentMutationVariables> {
    document = DocumentationSettingsDeleteDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    documentationSettingsDeleteDocument: 'documentationSettingsDeleteDocument'
  }
}