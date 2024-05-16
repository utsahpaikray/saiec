import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AssetBySystemComponentIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  systemComponentId: Types.Scalars['String'];
}>;


export type AssetBySystemComponentIdQuery = { __typename?: 'Query', assetBySystemComponentId?: { __typename?: 'Asset', systemComponentId: string, description: string, markCode?: string | null, markNumber?: string | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAssetBySystemComponentIdQuery(
 *   ({ query, variables }) => {
 *     const { siteId, systemComponentId } = variables;
 *     return HttpResponse.json({
 *       data: { assetBySystemComponentId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAssetBySystemComponentIdQuery = (resolver: GraphQLResponseResolver<AssetBySystemComponentIdQuery, AssetBySystemComponentIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<AssetBySystemComponentIdQuery, AssetBySystemComponentIdQueryVariables>(
    'assetBySystemComponentId',
    resolver,
    options
  )
