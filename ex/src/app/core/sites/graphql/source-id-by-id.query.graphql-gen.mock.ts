import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SourceIdByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SourceIdByIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', sourceId: string }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSourceIdByIdQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSourceIdByIdQuery = (resolver: GraphQLResponseResolver<SourceIdByIdQuery, SourceIdByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SourceIdByIdQuery, SourceIdByIdQueryVariables>(
    'sourceIdById',
    resolver,
    options
  )
