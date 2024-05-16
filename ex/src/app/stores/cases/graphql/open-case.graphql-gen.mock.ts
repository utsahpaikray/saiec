import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type OpenCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type OpenCaseMutation = { __typename?: 'Mutation', openCase: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOpenCaseMutation(
 *   ({ query, variables }) => {
 *     const { caseId } = variables;
 *     return HttpResponse.json({
 *       data: { openCase }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockOpenCaseMutation = (resolver: GraphQLResponseResolver<OpenCaseMutation, OpenCaseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<OpenCaseMutation, OpenCaseMutationVariables>(
    'openCase',
    resolver,
    options
  )
