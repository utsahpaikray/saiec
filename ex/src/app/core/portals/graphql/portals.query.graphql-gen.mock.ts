import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AllPortalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllPortalsQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', id: any, name: string }> };

export type AccessiblePortalsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccessiblePortalsQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessiblePortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } };

export type PortalByPortalIdQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type PortalByPortalIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessiblePortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } };

export type AllocatedPortalsQueryVariables = Types.Exact<{
  id: Types.Scalars['UUID'];
}>;


export type AllocatedPortalsQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AllocatedPortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllPortalsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { portals }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllPortalsQuery = (resolver: GraphQLResponseResolver<AllPortalsQuery, AllPortalsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AllPortalsQuery, AllPortalsQueryVariables>(
    'allPortals',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAccessiblePortalsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAccessiblePortalsQuery = (resolver: GraphQLResponseResolver<AccessiblePortalsQuery, AccessiblePortalsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AccessiblePortalsQuery, AccessiblePortalsQueryVariables>(
    'accessiblePortals',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPortalByPortalIdQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPortalByPortalIdQuery = (resolver: GraphQLResponseResolver<PortalByPortalIdQuery, PortalByPortalIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<PortalByPortalIdQuery, PortalByPortalIdQueryVariables>(
    'portalByPortalId',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllocatedPortalsQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { user }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllocatedPortalsQuery = (resolver: GraphQLResponseResolver<AllocatedPortalsQuery, AllocatedPortalsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AllocatedPortalsQuery, AllocatedPortalsQueryVariables>(
    'allocatedPortals',
    resolver,
    options
  )
