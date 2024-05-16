import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteSwitcherSiteFragment = { __typename?: 'Site', portal: { __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> } };

export type SiteSwitcherSiteByIdQueryVariables = Types.Exact<{
  siteId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SiteSwitcherSiteByIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', portal: { __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> } }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteSwitcherSiteByIdQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteSwitcherSiteByIdQuery = (resolver: GraphQLResponseResolver<SiteSwitcherSiteByIdQuery, SiteSwitcherSiteByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteSwitcherSiteByIdQuery, SiteSwitcherSiteByIdQueryVariables>(
    'siteSwitcherSiteById',
    resolver,
    options
  )
