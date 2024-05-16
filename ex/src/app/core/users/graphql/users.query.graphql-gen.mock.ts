import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AllUsersQueryVariables = Types.Exact<{
  searchText?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'IdentityUser', firstName?: string | null, lastName?: string | null, prefix?: string | null, email?: string | null, customerEmail?: string | null, id?: any | null }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllUsersQuery(
 *   ({ query, variables }) => {
 *     const { searchText } = variables;
 *     return HttpResponse.json({
 *       data: { users }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllUsersQuery = (resolver: GraphQLResponseResolver<AllUsersQuery, AllUsersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AllUsersQuery, AllUsersQueryVariables>(
    'allUsers',
    resolver,
    options
  )
