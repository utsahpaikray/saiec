import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentationSettingsDocumentsPerCategoryQueryVariables = Types.Exact<{
  categoryCodeName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentationSettingsDocumentsPerCategoryQuery = { __typename?: 'Query', documentsBySite: Array<{ __typename?: 'BlobItem', name?: string | null, contentLength?: any | null, categoryCodeName: string, culture: string }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentationSettingsDocumentsPerCategoryQuery(
 *   ({ query, variables }) => {
 *     const { categoryCodeName, siteId } = variables;
 *     return HttpResponse.json({
 *       data: { documentsBySite }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentationSettingsDocumentsPerCategoryQuery = (resolver: GraphQLResponseResolver<DocumentationSettingsDocumentsPerCategoryQuery, DocumentationSettingsDocumentsPerCategoryQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentationSettingsDocumentsPerCategoryQuery, DocumentationSettingsDocumentsPerCategoryQueryVariables>(
    'documentationSettingsDocumentsPerCategory',
    resolver,
    options
  )
