import * as Types from '../../../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AddUserMutationVariables = Types.Exact<{
  upn: Types.Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddUserMutation(
 *   ({ query, variables }) => {
 *     const { upn } = variables;
 *     return HttpResponse.json({
 *       data: { addUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAddUserMutation = (resolver: GraphQLResponseResolver<AddUserMutation, AddUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AddUserMutation, AddUserMutationVariables>(
    'addUser',
    resolver,
    options
  )
