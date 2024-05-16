import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type MaximoUserApiKeyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MaximoUserApiKeyQuery = { __typename?: 'Query', maximoUserApiKey: string };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMaximoUserApiKeyQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { maximoUserApiKey }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockMaximoUserApiKeyQuery = (resolver: GraphQLResponseResolver<MaximoUserApiKeyQuery, MaximoUserApiKeyQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<MaximoUserApiKeyQuery, MaximoUserApiKeyQueryVariables>(
    'maximoUserApiKey',
    resolver,
    options
  )
