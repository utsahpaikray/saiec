import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteDetailGuardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SiteDetailGuardQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', id: any, portal: { __typename?: 'Portal', id: any } }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteDetailGuardQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteDetailGuardQuery = (resolver: GraphQLResponseResolver<SiteDetailGuardQuery, SiteDetailGuardQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteDetailGuardQuery, SiteDetailGuardQueryVariables>(
    'siteDetailGuard',
    resolver,
    options
  )
