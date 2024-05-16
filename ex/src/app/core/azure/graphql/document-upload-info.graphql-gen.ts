import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentUploadInfoFragment = { __typename?: 'BlobUploadInfo', sasToken: string, serviceUrl: string, containerName: string, blobName: string, fullBlobUri: string };

export type DocumentUploadInfoQueryVariables = Types.Exact<{
  documentName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
  categoryCodeName: Types.Scalars['String'];
  culture: Types.Scalars['String'];
}>;


export type DocumentUploadInfoQuery = { __typename?: 'Query', documentUploadInfo: { __typename?: 'BlobUploadInfo', sasToken: string, serviceUrl: string, containerName: string, blobName: string, fullBlobUri: string } };

export const DocumentUploadInfoFragmentDoc = gql`
    fragment DocumentUploadInfo on BlobUploadInfo {
  sasToken
  serviceUrl
  containerName
  blobName
  fullBlobUri
}
    `;
export const DocumentUploadInfoDocument = gql`
    query documentUploadInfo($documentName: String!, $siteId: UUID!, $categoryCodeName: String!, $culture: String!) {
  documentUploadInfo(
    documentName: $documentName
    siteId: $siteId
    categoryCodeName: $categoryCodeName
    culture: $culture
  ) {
    ...DocumentUploadInfo
  }
}
    ${DocumentUploadInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentUploadInfoGQL extends Apollo.Query<DocumentUploadInfoQuery, DocumentUploadInfoQueryVariables> {
    document = DocumentUploadInfoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentUploadInfo: 'documentUploadInfo'
  },
  Fragment: {
    DocumentUploadInfo: 'DocumentUploadInfo'
  }
}