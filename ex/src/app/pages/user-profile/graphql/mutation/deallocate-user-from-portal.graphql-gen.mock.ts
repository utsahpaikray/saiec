import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DeallocateUserFromPortalMutationVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type DeallocateUserFromPortalMutation = { __typename?: 'Mutation', deallocateUserFromPortal: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeallocateUserFromPortalMutation(
 *   ({ query, variables }) => {
 *     const { portalId, userId } = variables;
 *     return HttpResponse.json({
 *       data: { deallocateUserFromPortal }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeallocateUserFromPortalMutation = (resolver: GraphQLResponseResolver<DeallocateUserFromPortalMutation, DeallocateUserFromPortalMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<DeallocateUserFromPortalMutation, DeallocateUserFromPortalMutationVariables>(
    'deallocateUserFromPortal',
    resolver,
    options
  )
