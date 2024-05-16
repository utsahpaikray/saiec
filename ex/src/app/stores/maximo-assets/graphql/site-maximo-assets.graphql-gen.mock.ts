import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteMaximoAssetsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  searchText: Types.Scalars['String'];
  skip: Types.Scalars['Int'];
  take: Types.Scalars['Int'];
}>;


export type SiteMaximoAssetsQuery = { __typename?: 'Query', assetSearch?: { __typename?: 'AssetSearchCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean }, items?: Array<{ __typename?: 'Asset', systemComponentId: string, description: string, markCode?: string | null, markNumber?: string | null }> | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteMaximoAssetsQuery(
 *   ({ query, variables }) => {
 *     const { siteId, searchText, skip, take } = variables;
 *     return HttpResponse.json({
 *       data: { assetSearch }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteMaximoAssetsQuery = (resolver: GraphQLResponseResolver<SiteMaximoAssetsQuery, SiteMaximoAssetsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteMaximoAssetsQuery, SiteMaximoAssetsQueryVariables>(
    'siteMaximoAssets',
    resolver,
    options
  )
