import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type PortalUserFragment = { __typename?: 'Portal_usersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'Portal_usersEdge', cursor: string, node: { __typename?: 'RelatedPortalData', relatedIdentityData?: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, email?: string | null, customerEmail?: string | null, id?: any | null } | null } }> | null };

export type PortalUsersQueryVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PortalUsersQuery = { __typename?: 'Query', portal_users?: { __typename?: 'Portal_usersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, edges?: Array<{ __typename?: 'Portal_usersEdge', cursor: string, node: { __typename?: 'RelatedPortalData', relatedIdentityData?: { __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, email?: string | null, customerEmail?: string | null, id?: any | null } | null } }> | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPortalUsersQuery(
 *   ({ query, variables }) => {
 *     const { portalId, cursor } = variables;
 *     return HttpResponse.json({
 *       data: { portal_users }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPortalUsersQuery = (resolver: GraphQLResponseResolver<PortalUsersQuery, PortalUsersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<PortalUsersQuery, PortalUsersQueryVariables>(
    'portalUsers',
    resolver,
    options
  )
