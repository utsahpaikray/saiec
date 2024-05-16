import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentationSettingsDocumentUrlQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentationSettingsDocumentUrlQuery = { __typename?: 'Query', documentUrl: any };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentationSettingsDocumentUrlQuery(
 *   ({ query, variables }) => {
 *     const { name, siteId } = variables;
 *     return HttpResponse.json({
 *       data: { documentUrl }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentationSettingsDocumentUrlQuery = (resolver: GraphQLResponseResolver<DocumentationSettingsDocumentUrlQuery, DocumentationSettingsDocumentUrlQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentationSettingsDocumentUrlQuery, DocumentationSettingsDocumentUrlQueryVariables>(
    'documentationSettingsDocumentUrl',
    resolver,
    options
  )
