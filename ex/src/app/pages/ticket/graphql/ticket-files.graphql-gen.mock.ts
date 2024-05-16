import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type TicketFilesQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  filesFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  filesCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketFilesQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', files?: { __typename?: 'FilesConnection', totalCount: number, nodes?: Array<{ __typename?: 'File', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTicketFilesQuery(
 *   ({ query, variables }) => {
 *     const { id, filesFirst, filesCursor } = variables;
 *     return HttpResponse.json({
 *       data: { ticket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTicketFilesQuery = (resolver: GraphQLResponseResolver<TicketFilesQuery, TicketFilesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TicketFilesQuery, TicketFilesQueryVariables>(
    'ticketFiles',
    resolver,
    options
  )
