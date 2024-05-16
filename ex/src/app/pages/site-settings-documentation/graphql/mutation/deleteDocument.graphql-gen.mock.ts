import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentationSettingsDeleteDocumentMutationVariables = Types.Exact<{
  documentName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentationSettingsDeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentationSettingsDeleteDocumentMutation(
 *   ({ query, variables }) => {
 *     const { documentName, siteId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteDocument }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentationSettingsDeleteDocumentMutation = (resolver: GraphQLResponseResolver<DocumentationSettingsDeleteDocumentMutation, DocumentationSettingsDeleteDocumentMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DocumentationSettingsDeleteDocumentMutation, DocumentationSettingsDeleteDocumentMutationVariables>(
    'documentationSettingsDeleteDocument',
    resolver,
    options
  )
