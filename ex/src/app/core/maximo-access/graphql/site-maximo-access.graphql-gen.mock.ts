import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteMaximoAccessQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteMaximoAccessQuery = { __typename?: 'Query', maximoAccess: { __typename?: 'MaximoUserAccess', canReadTickets: boolean, canWriteTickets: boolean } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteMaximoAccessQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { maximoAccess }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteMaximoAccessQuery = (resolver: GraphQLResponseResolver<SiteMaximoAccessQuery, SiteMaximoAccessQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteMaximoAccessQuery, SiteMaximoAccessQueryVariables>(
    'siteMaximoAccess',
    resolver,
    options
  )
