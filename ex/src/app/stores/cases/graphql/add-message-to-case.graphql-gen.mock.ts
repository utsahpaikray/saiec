import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AddMessageToCaseMutationVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
  content: Types.Scalars['String'];
}>;


export type AddMessageToCaseMutation = { __typename?: 'Mutation', addMessageToCase: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddMessageToCaseMutation(
 *   ({ query, variables }) => {
 *     const { caseId, content } = variables;
 *     return HttpResponse.json({
 *       data: { addMessageToCase }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAddMessageToCaseMutation = (resolver: GraphQLResponseResolver<AddMessageToCaseMutation, AddMessageToCaseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AddMessageToCaseMutation, AddMessageToCaseMutationVariables>(
    'addMessageToCase',
    resolver,
    options
  )
