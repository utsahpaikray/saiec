import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type PortalByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type PortalByIdQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', name: string, id: any }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPortalByIdQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { portals }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPortalByIdQuery = (resolver: GraphQLResponseResolver<PortalByIdQuery, PortalByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<PortalByIdQuery, PortalByIdQueryVariables>(
    'portalById',
    resolver,
    options
  )
