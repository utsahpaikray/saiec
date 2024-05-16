import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AllocateUserToSiteMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  userId: Types.Scalars['UUID'];
}>;


export type AllocateUserToSiteMutation = { __typename?: 'Mutation', allocateUserToSite: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAllocateUserToSiteMutation(
 *   ({ query, variables }) => {
 *     const { siteId, userId } = variables;
 *     return HttpResponse.json({
 *       data: { allocateUserToSite }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAllocateUserToSiteMutation = (resolver: GraphQLResponseResolver<AllocateUserToSiteMutation, AllocateUserToSiteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AllocateUserToSiteMutation, AllocateUserToSiteMutationVariables>(
    'allocateUserToSite',
    resolver,
    options
  )
