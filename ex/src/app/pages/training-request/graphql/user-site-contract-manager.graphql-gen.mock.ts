import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UserSiteContractManagerQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteContractManagerQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', contractManagerContact: { __typename?: 'ContractManagerContact', emailAddress?: string | null } }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserSiteContractManagerQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserSiteContractManagerQuery = (resolver: GraphQLResponseResolver<UserSiteContractManagerQuery, UserSiteContractManagerQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserSiteContractManagerQuery, UserSiteContractManagerQueryVariables>(
    'userSiteContractManager',
    resolver,
    options
  )
