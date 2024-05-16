import * as Types from '../../../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UserByUsernameQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', userByUsername: { __typename?: 'IdentityUser', id?: any | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserByUsernameQuery(
 *   ({ query, variables }) => {
 *     const { username } = variables;
 *     return HttpResponse.json({
 *       data: { userByUsername }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserByUsernameQuery = (resolver: GraphQLResponseResolver<UserByUsernameQuery, UserByUsernameQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserByUsernameQuery, UserByUsernameQueryVariables>(
    'userByUsername',
    resolver,
    options
  )
