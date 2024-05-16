import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type TicketCommentFragment = { __typename?: 'Comment', maximoCommentID: string, description: string, timeStamp: any, author?: string | null };

export type TicketCommentsFragment = { __typename?: 'Ticket', comments?: { __typename?: 'CommentsConnection', nodes?: Array<{ __typename?: 'Comment', maximoCommentID: string, description: string, timeStamp: any, author?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type CommentsFragment = { __typename?: 'Ticket', comments?: { __typename?: 'CommentsConnection', nodes?: Array<{ __typename?: 'Comment', maximoCommentID: string, description: string, timeStamp: any, author?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type TicketFileFragment = { __typename?: 'File', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null };

export type TicketFilesFragment = { __typename?: 'Ticket', files?: { __typename?: 'FilesConnection', totalCount: number, nodes?: Array<{ __typename?: 'File', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type TicketWebLinkFragment = { __typename?: 'WebLink', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null };

export type TicketWebLinksFragment = { __typename?: 'Ticket', webLinks?: { __typename?: 'WebLinksConnection', totalCount: number, nodes?: Array<{ __typename?: 'WebLink', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type TicketByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  commentsFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  commentsCursor?: Types.InputMaybe<Types.Scalars['String']>;
  filesFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  filesCursor?: Types.InputMaybe<Types.Scalars['String']>;
  webLinksFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  webLinksCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketByIdQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', id: string, title?: string | null, sourceState?: string | null, priority?: string | null, customerPriority?: string | null, issueType: Types.IssueType, state?: string | null, description: string, customerReference?: string | null, reportDate: any, systemComponentId?: string | null, symptom?: string | null, analysis?: string | null, solution?: string | null, files?: { __typename?: 'FilesConnection', totalCount: number, nodes?: Array<{ __typename?: 'File', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null, webLinks?: { __typename?: 'WebLinksConnection', totalCount: number, nodes?: Array<{ __typename?: 'WebLink', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null, comments?: { __typename?: 'CommentsConnection', nodes?: Array<{ __typename?: 'Comment', maximoCommentID: string, description: string, timeStamp: any, author?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTicketByIdQuery(
 *   ({ query, variables }) => {
 *     const { id, commentsFirst, commentsCursor, filesFirst, filesCursor, webLinksFirst, webLinksCursor } = variables;
 *     return HttpResponse.json({
 *       data: { ticket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTicketByIdQuery = (resolver: GraphQLResponseResolver<TicketByIdQuery, TicketByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TicketByIdQuery, TicketByIdQueryVariables>(
    'ticketById',
    resolver,
    options
  )
