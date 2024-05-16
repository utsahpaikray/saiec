import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type PortalAdminSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PortalAdminSitesQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', id: any, name: string, sites: Array<{ __typename?: 'Site', name: string, id: any }> }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPortalAdminSitesQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPortalAdminSitesQuery = (resolver: GraphQLResponseResolver<PortalAdminSitesQuery, PortalAdminSitesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<PortalAdminSitesQuery, PortalAdminSitesQueryVariables>(
    'portalAdminSites',
    resolver,
    options
  )
