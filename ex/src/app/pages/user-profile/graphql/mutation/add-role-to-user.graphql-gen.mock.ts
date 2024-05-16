import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AddRoleToUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['UUID'];
  roleId: Types.Scalars['UUID'];
}>;


export type AddRoleToUserMutation = { __typename?: 'Mutation', addRoleToUser: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddRoleToUserMutation(
 *   ({ query, variables }) => {
 *     const { userId, roleId } = variables;
 *     return HttpResponse.json({
 *       data: { addRoleToUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAddRoleToUserMutation = (resolver: GraphQLResponseResolver<AddRoleToUserMutation, AddRoleToUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AddRoleToUserMutation, AddRoleToUserMutationVariables>(
    'addRoleToUser',
    resolver,
    options
  )
