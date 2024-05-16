import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentUploadInfoFragment = { __typename?: 'BlobUploadInfo', sasToken: string, serviceUrl: string, containerName: string, blobName: string, fullBlobUri: string };

export type DocumentUploadInfoQueryVariables = Types.Exact<{
  documentName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
  categoryCodeName: Types.Scalars['String'];
  culture: Types.Scalars['String'];
}>;


export type DocumentUploadInfoQuery = { __typename?: 'Query', documentUploadInfo: { __typename?: 'BlobUploadInfo', sasToken: string, serviceUrl: string, containerName: string, blobName: string, fullBlobUri: string } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentUploadInfoQuery(
 *   ({ query, variables }) => {
 *     const { documentName, siteId, categoryCodeName, culture } = variables;
 *     return HttpResponse.json({
 *       data: { documentUploadInfo }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentUploadInfoQuery = (resolver: GraphQLResponseResolver<DocumentUploadInfoQuery, DocumentUploadInfoQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentUploadInfoQuery, DocumentUploadInfoQueryVariables>(
    'documentUploadInfo',
    resolver,
    options
  )
