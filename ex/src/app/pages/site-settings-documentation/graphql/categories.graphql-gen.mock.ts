import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentationSettingsCategoriesQueryVariables = Types.Exact<{
  culture?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type DocumentationSettingsCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: any, codeName: string, categoryCultures: Array<{ __typename?: 'CategoryCulture', name: string }> }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentationSettingsCategoriesQuery(
 *   ({ query, variables }) => {
 *     const { culture } = variables;
 *     return HttpResponse.json({
 *       data: { categories }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentationSettingsCategoriesQuery = (resolver: GraphQLResponseResolver<DocumentationSettingsCategoriesQuery, DocumentationSettingsCategoriesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentationSettingsCategoriesQuery, DocumentationSettingsCategoriesQueryVariables>(
    'documentationSettingsCategories',
    resolver,
    options
  )
