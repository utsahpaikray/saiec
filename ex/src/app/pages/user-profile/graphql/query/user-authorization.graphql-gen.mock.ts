import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UserRoleFragment = { __typename?: 'Role', id: any, name: string };

export type UserFragment = { __typename?: 'IdentityUser', id?: any | null };

export type UserAuthorizationQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
}>;


export type UserAuthorizationQuery = { __typename?: 'Query', user?: { __typename?: 'IdentityUser', id?: any | null, roles: Array<{ __typename?: 'Role', id: any, name: string }>, assignableRoles: Array<{ __typename?: 'Role', id: any, name: string }> } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserAuthorizationQuery(
 *   ({ query, variables }) => {
 *     const { userId } = variables;
 *     return HttpResponse.json({
 *       data: { user }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserAuthorizationQuery = (resolver: GraphQLResponseResolver<UserAuthorizationQuery, UserAuthorizationQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserAuthorizationQuery, UserAuthorizationQueryVariables>(
    'userAuthorization',
    resolver,
    options
  )
