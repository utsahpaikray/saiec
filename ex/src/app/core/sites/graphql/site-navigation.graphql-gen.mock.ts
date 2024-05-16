import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteSparePartsFragment = { __typename?: 'Site', sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean } };

export type SiteSparePartsConfigFragment = { __typename?: 'SparePartsShopConfig', enabled: boolean };

export type SiteVidiFragment = { __typename?: 'Site', vidiConfig: { __typename?: 'VidiConfig', enabled: boolean } };

export type SiteVidiConfigFragment = { __typename?: 'VidiConfig', enabled: boolean };

export type SiteNavigationQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteNavigationQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', contractVisible: boolean, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> };

export type SiteDivertHealthFragment = { __typename?: 'Site', divertHealthConfig: { __typename?: 'DivertHealthConfig', enabled: boolean } };

export type SiteDivertHealthConfigFragment = { __typename?: 'DivertHealthConfig', enabled: boolean };

export type SiteNavigationAccessibleSitesQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteNavigationAccessibleSitesQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', contractVisible: boolean, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', segment: Types.Segment }>, divertHealthConfig: { __typename?: 'DivertHealthConfig', enabled: boolean } }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteNavigationQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteNavigationQuery = (resolver: GraphQLResponseResolver<SiteNavigationQuery, SiteNavigationQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteNavigationQuery, SiteNavigationQueryVariables>(
    'siteNavigation',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteNavigationAccessibleSitesQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteNavigationAccessibleSitesQuery = (resolver: GraphQLResponseResolver<SiteNavigationAccessibleSitesQuery, SiteNavigationAccessibleSitesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteNavigationAccessibleSitesQuery, SiteNavigationAccessibleSitesQueryVariables>(
    'siteNavigationAccessibleSites',
    resolver,
    options
  )
