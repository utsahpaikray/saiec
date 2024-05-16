import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentCategoriesQueryVariables = Types.Exact<{
  culture?: Types.InputMaybe<Types.Scalars['String']>;
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentCategoriesQuery = { __typename?: 'Query', categoriesBySite: Array<string>, categories: Array<{ __typename?: 'Category', id: any, codeName: string, categoryCultures: Array<{ __typename?: 'CategoryCulture', name: string, culture: string, description: string }>, categoryAccesses: Array<{ __typename?: 'CategoryAccess', roleReference: string }> }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentCategoriesQuery(
 *   ({ query, variables }) => {
 *     const { culture, siteId } = variables;
 *     return HttpResponse.json({
 *       data: { categories, categoriesBySite }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentCategoriesQuery = (resolver: GraphQLResponseResolver<DocumentCategoriesQuery, DocumentCategoriesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentCategoriesQuery, DocumentCategoriesQueryVariables>(
    'documentCategories',
    resolver,
    options
  )
