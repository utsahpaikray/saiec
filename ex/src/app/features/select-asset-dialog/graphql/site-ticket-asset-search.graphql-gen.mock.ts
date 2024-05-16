import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteTicketAssetSearchQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  searchText: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SiteTicketAssetSearchQuery = { __typename?: 'Query', assetSearch?: { __typename?: 'AssetSearchCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Asset', description: string, siteId: string, markCode?: string | null, markNumber?: string | null, customerNumber?: string | null, systemComponentId: string }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteTicketAssetSearchQuery(
 *   ({ query, variables }) => {
 *     const { siteId, searchText, skip } = variables;
 *     return HttpResponse.json({
 *       data: { assetSearch }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteTicketAssetSearchQuery = (resolver: GraphQLResponseResolver<SiteTicketAssetSearchQuery, SiteTicketAssetSearchQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteTicketAssetSearchQuery, SiteTicketAssetSearchQueryVariables>(
    'siteTicketAssetSearch',
    resolver,
    options
  )
