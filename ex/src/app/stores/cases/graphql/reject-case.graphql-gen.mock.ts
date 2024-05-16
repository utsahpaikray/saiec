import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type RejectCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type RejectCaseMutation = { __typename?: 'Mutation', rejectCase: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRejectCaseMutation(
 *   ({ query, variables }) => {
 *     const { caseId } = variables;
 *     return HttpResponse.json({
 *       data: { rejectCase }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRejectCaseMutation = (resolver: GraphQLResponseResolver<RejectCaseMutation, RejectCaseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<RejectCaseMutation, RejectCaseMutationVariables>(
    'rejectCase',
    resolver,
    options
  )
