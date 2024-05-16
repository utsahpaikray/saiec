import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type DocumentSearchQueryVariables = Types.Exact<{
  searchString: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
  userCulture: Types.Scalars['String'];
  filters: Array<Types.DocumentSearchFilterInput> | Types.DocumentSearchFilterInput;
}>;


export type DocumentSearchQuery = { __typename?: 'Query', documentSearch: { __typename?: 'DocumentSearchResult', result: Array<{ __typename?: 'DocumentSearchResultItem', location: string, contentHighlights: Array<string>, metadata_storage_name: string, metadata_storage_size: number, storage_path: string, culture: string }> } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDocumentSearchQuery(
 *   ({ query, variables }) => {
 *     const { searchString, siteId, userCulture, filters } = variables;
 *     return HttpResponse.json({
 *       data: { documentSearch }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDocumentSearchQuery = (resolver: GraphQLResponseResolver<DocumentSearchQuery, DocumentSearchQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<DocumentSearchQuery, DocumentSearchQueryVariables>(
    'documentSearch',
    resolver,
    options
  )
