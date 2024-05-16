import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentCategoryQueryVariables = Types.Exact<{
  categoryCodeName: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentCategoryQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', codeName: string, categoryCultures: Array<{ __typename?: 'CategoryCulture', name: string, culture: string }> }>, documentsBySite: Array<{ __typename?: 'BlobItem', name?: string | null, contentLength?: any | null, culture: string }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentCategoryQuery(
 *   ({ query, variables }) => {
 *     const { categoryCodeName, siteId } = variables;
 *     return HttpResponse.json({
 *       data: { categories, documentsBySite }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentCategoryQuery = (resolver: GraphQLResponseResolver<DocumentCategoryQuery, DocumentCategoryQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentCategoryQuery, DocumentCategoryQueryVariables>(
    'documentCategory',
    resolver,
    options
  )
