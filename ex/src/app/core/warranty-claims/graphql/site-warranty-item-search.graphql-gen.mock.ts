import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteWarrantyItemFragment = { __typename?: 'Asset', description: string, itemNumber?: string | null, systemComponentId: string, classificationLevel1?: string | null, classificationLevel2?: string | null, classificationLevel3?: string | null, classificationLevel4?: string | null, classificationLevel5?: string | null, sparePartCategory?: string | null };

export type SiteWarrantyItemSearchQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  searchText: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SiteWarrantyItemSearchQuery = { __typename?: 'Query', itemSearch?: { __typename?: 'ItemSearchCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean }, items?: Array<{ __typename?: 'Asset', description: string, itemNumber?: string | null, systemComponentId: string, classificationLevel1?: string | null, classificationLevel2?: string | null, classificationLevel3?: string | null, classificationLevel4?: string | null, classificationLevel5?: string | null, sparePartCategory?: string | null }> | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteWarrantyItemSearchQuery(
 *   ({ query, variables }) => {
 *     const { siteId, searchText, skip } = variables;
 *     return HttpResponse.json({
 *       data: { itemSearch }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteWarrantyItemSearchQuery = (resolver: GraphQLResponseResolver<SiteWarrantyItemSearchQuery, SiteWarrantyItemSearchQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteWarrantyItemSearchQuery, SiteWarrantyItemSearchQueryVariables>(
    'siteWarrantyItemSearch',
    resolver,
    options
  )
