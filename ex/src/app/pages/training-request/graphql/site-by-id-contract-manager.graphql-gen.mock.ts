import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteByIdContractManagerQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteByIdContractManagerQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', contractManagerContact: { __typename?: 'ContractManagerContact', emailAddress?: string | null } }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteByIdContractManagerQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteByIdContractManagerQuery = (resolver: GraphQLResponseResolver<SiteByIdContractManagerQuery, SiteByIdContractManagerQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteByIdContractManagerQuery, SiteByIdContractManagerQueryVariables>(
    'siteByIdContractManager',
    resolver,
    options
  )
