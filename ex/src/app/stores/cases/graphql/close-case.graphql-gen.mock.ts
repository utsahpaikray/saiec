import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type CloseCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type CloseCaseMutation = { __typename?: 'Mutation', closeCase: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCloseCaseMutation(
 *   ({ query, variables }) => {
 *     const { caseId } = variables;
 *     return HttpResponse.json({
 *       data: { closeCase }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCloseCaseMutation = (resolver: GraphQLResponseResolver<CloseCaseMutation, CloseCaseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CloseCaseMutation, CloseCaseMutationVariables>(
    'closeCase',
    resolver,
    options
  )
