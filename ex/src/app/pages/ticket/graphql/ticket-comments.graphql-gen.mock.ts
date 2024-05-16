import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type TicketCommentsQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  commentsFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  commentsCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketCommentsQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', comments?: { __typename?: 'CommentsConnection', nodes?: Array<{ __typename?: 'Comment', maximoCommentID: string, description: string, timeStamp: any, author?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTicketCommentsQuery(
 *   ({ query, variables }) => {
 *     const { id, commentsFirst, commentsCursor } = variables;
 *     return HttpResponse.json({
 *       data: { ticket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTicketCommentsQuery = (resolver: GraphQLResponseResolver<TicketCommentsQuery, TicketCommentsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TicketCommentsQuery, TicketCommentsQueryVariables>(
    'ticketComments',
    resolver,
    options
  )
