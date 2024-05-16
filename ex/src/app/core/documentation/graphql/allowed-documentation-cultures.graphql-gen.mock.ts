import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentCultureFragment = { __typename?: 'CultureInfo', englishName: string, name: string };

export type AllowedDocumentationCulturesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllowedDocumentationCulturesQuery = { __typename?: 'Query', allowedDocumentationCultures: Array<{ __typename?: 'CultureInfo', englishName: string, name: string }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllowedDocumentationCulturesQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { allowedDocumentationCultures }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllowedDocumentationCulturesQuery = (resolver: GraphQLResponseResolver<AllowedDocumentationCulturesQuery, AllowedDocumentationCulturesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AllowedDocumentationCulturesQuery, AllowedDocumentationCulturesQueryVariables>(
    'allowedDocumentationCultures',
    resolver,
    options
  )
