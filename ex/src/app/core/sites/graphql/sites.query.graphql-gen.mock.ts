import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AccessibleSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccessibleSitesQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } };

export type AllocatedSitesQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type AllocatedSitesQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AllocatedSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAccessibleSitesQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAccessibleSitesQuery = (resolver: GraphQLResponseResolver<AccessibleSitesQuery, AccessibleSitesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AccessibleSitesQuery, AccessibleSitesQueryVariables>(
    'accessibleSites',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllocatedSitesQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { user }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllocatedSitesQuery = (resolver: GraphQLResponseResolver<AllocatedSitesQuery, AllocatedSitesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AllocatedSitesQuery, AllocatedSitesQueryVariables>(
    'allocatedSites',
    resolver,
    options
  )
