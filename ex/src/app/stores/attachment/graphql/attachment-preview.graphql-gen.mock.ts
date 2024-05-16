import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AttachmentPreviewQueryVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
  attachmentId: Types.Scalars['UUID'];
}>;


export type AttachmentPreviewQuery = { __typename?: 'Query', case?: { __typename?: 'Case', attachments: Array<{ __typename?: 'Attachment', id: any, name: string, contentType: string, UrlWithToken: string }> } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAttachmentPreviewQuery(
 *   ({ query, variables }) => {
 *     const { caseId, attachmentId } = variables;
 *     return HttpResponse.json({
 *       data: { case }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAttachmentPreviewQuery = (resolver: GraphQLResponseResolver<AttachmentPreviewQuery, AttachmentPreviewQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AttachmentPreviewQuery, AttachmentPreviewQueryVariables>(
    'attachmentPreview',
    resolver,
    options
  )
