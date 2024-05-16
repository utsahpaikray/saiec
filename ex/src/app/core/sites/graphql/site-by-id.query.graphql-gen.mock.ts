import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SiteByIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', name: string, portal: { __typename?: 'Portal', name: string, id: any } }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteByIdQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteByIdQuery = (resolver: GraphQLResponseResolver<SiteByIdQuery, SiteByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteByIdQuery, SiteByIdQueryVariables>(
    'siteById',
    resolver,
    options
  )
