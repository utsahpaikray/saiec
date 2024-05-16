import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type RequestTrainingMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  trainingRequest: Types.TrainingRequestInput;
}>;


export type RequestTrainingMutation = { __typename?: 'Mutation', requestTraining: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRequestTrainingMutation(
 *   ({ query, variables }) => {
 *     const { siteId, trainingRequest } = variables;
 *     return HttpResponse.json({
 *       data: { requestTraining }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRequestTrainingMutation = (resolver: GraphQLResponseResolver<RequestTrainingMutation, RequestTrainingMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<RequestTrainingMutation, RequestTrainingMutationVariables>(
    'requestTraining',
    resolver,
    options
  )
