import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteTicketAssetFragment = { __typename?: 'Asset', description: string, siteId: string, markCode?: string | null, markNumber?: string | null, customerNumber?: string | null, systemComponentId: string };

export type SiteTicketAssetBySystemComponentIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  systemComponentId: Types.Scalars['String'];
}>;


export type SiteTicketAssetBySystemComponentIdQuery = { __typename?: 'Query', assetBySystemComponentId?: { __typename?: 'Asset', description: string, siteId: string, markCode?: string | null, markNumber?: string | null, customerNumber?: string | null, systemComponentId: string } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteTicketAssetBySystemComponentIdQuery(
 *   ({ query, variables }) => {
 *     const { siteId, systemComponentId } = variables;
 *     return HttpResponse.json({
 *       data: { assetBySystemComponentId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteTicketAssetBySystemComponentIdQuery = (resolver: GraphQLResponseResolver<SiteTicketAssetBySystemComponentIdQuery, SiteTicketAssetBySystemComponentIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteTicketAssetBySystemComponentIdQuery, SiteTicketAssetBySystemComponentIdQueryVariables>(
    'siteTicketAssetBySystemComponentId',
    resolver,
    options
  )
