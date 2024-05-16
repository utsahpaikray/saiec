import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type ProjectSegmentFragmentFragment = { __typename?: 'Project', segment: Types.Segment };

export type SiteFragmentFragment = { __typename?: 'Site', contractVisible: boolean, id: any, name: string, published: boolean, sourceId: string, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> };

export type UserSitesByPortalIdQueryVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
}>;


export type UserSitesByPortalIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', contractVisible: boolean, id: any, name: string, published: boolean, sourceId: string, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> } | null } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserSitesByPortalIdQuery(
 *   ({ query, variables }) => {
 *     const { portalId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserSitesByPortalIdQuery = (resolver: GraphQLResponseResolver<UserSitesByPortalIdQuery, UserSitesByPortalIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserSitesByPortalIdQuery, UserSitesByPortalIdQueryVariables>(
    'userSitesByPortalId',
    resolver,
    options
  )
