import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AllocateUserToPortalMutationVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type AllocateUserToPortalMutation = { __typename?: 'Mutation', allocateUserToPortal: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllocateUserToPortalMutation(
 *   ({ query, variables }) => {
 *     const { portalId, userId } = variables;
 *     return HttpResponse.json({
 *       data: { allocateUserToPortal }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllocateUserToPortalMutation = (resolver: GraphQLResponseResolver<AllocateUserToPortalMutation, AllocateUserToPortalMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AllocateUserToPortalMutation, AllocateUserToPortalMutationVariables>(
    'allocateUserToPortal',
    resolver,
    options
  )
