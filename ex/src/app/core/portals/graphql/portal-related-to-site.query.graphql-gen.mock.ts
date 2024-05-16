import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type PortalRelatedToSiteQueryVariables = Types.Exact<{
  siteId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type PortalRelatedToSiteQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessiblePortals: Array<{ __typename?: 'Portal', id: any, name: string }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPortalRelatedToSiteQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPortalRelatedToSiteQuery = (resolver: GraphQLResponseResolver<PortalRelatedToSiteQuery, PortalRelatedToSiteQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<PortalRelatedToSiteQuery, PortalRelatedToSiteQueryVariables>(
    'portalRelatedToSite',
    resolver,
    options
  )
