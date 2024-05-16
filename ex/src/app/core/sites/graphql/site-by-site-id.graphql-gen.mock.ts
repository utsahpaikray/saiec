import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteBySiteIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteBySiteIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', id: any, name: string }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteBySiteIdQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteBySiteIdQuery = (resolver: GraphQLResponseResolver<SiteBySiteIdQuery, SiteBySiteIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteBySiteIdQuery, SiteBySiteIdQueryVariables>(
    'siteBySiteId',
    resolver,
    options
  )
