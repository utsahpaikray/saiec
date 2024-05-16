import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type PortalDetailGuardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PortalDetailGuardQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', id: any }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPortalDetailGuardQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { portals }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPortalDetailGuardQuery = (resolver: GraphQLResponseResolver<PortalDetailGuardQuery, PortalDetailGuardQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<PortalDetailGuardQuery, PortalDetailGuardQueryVariables>(
    'portalDetailGuard',
    resolver,
    options
  )
