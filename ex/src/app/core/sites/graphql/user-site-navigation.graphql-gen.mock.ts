import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UserSiteNavigationQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteNavigationQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', contractVisible: boolean, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserSiteNavigationQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserSiteNavigationQuery = (resolver: GraphQLResponseResolver<UserSiteNavigationQuery, UserSiteNavigationQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserSiteNavigationQuery, UserSiteNavigationQueryVariables>(
    'userSiteNavigation',
    resolver,
    options
  )
