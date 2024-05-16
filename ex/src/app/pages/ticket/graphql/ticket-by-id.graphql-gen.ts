import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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

export const TicketCommentFragmentDoc = gql`
    fragment ticketComment on Comment {
  maximoCommentID
  description
  timeStamp
  author
}
    `;
export const TicketCommentsFragmentDoc = gql`
    fragment ticketComments on Ticket {
  comments(
    first: $commentsFirst
    order: [{timeStamp: DESC}]
    after: $commentsCursor
  ) {
    nodes {
      ...ticketComment
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${TicketCommentFragmentDoc}`;
export const CommentsFragmentDoc = gql`
    fragment comments on Ticket {
  comments(
    first: $commentsFirst
    order: [{timeStamp: DESC}]
    after: $commentsCursor
  ) {
    nodes {
      ...ticketComment
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${TicketCommentFragmentDoc}`;
export const TicketFileFragmentDoc = gql`
    fragment ticketFile on File {
  description
  url
  name
  key {
    number
  }
}
    `;
export const TicketFilesFragmentDoc = gql`
    fragment ticketFiles on Ticket {
  files(first: $filesFirst, order: [{releaseDate: DESC}], after: $filesCursor) {
    nodes {
      ...ticketFile
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
    ${TicketFileFragmentDoc}`;
export const TicketWebLinkFragmentDoc = gql`
    fragment ticketWebLink on WebLink {
  description
  url
  name
  key {
    number
  }
}
    `;
export const TicketWebLinksFragmentDoc = gql`
    fragment ticketWebLinks on Ticket {
  webLinks(
    first: $webLinksFirst
    order: [{releaseDate: DESC}]
    after: $webLinksCursor
  ) {
    nodes {
      ...ticketWebLink
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
    ${TicketWebLinkFragmentDoc}`;
export const TicketByIdDocument = gql`
    query ticketById($id: String!, $commentsFirst: Int = 4, $commentsCursor: String, $filesFirst: Int = 5, $filesCursor: String, $webLinksFirst: Int = 5, $webLinksCursor: String) {
  ticket(id: $id) {
    id
    title
    sourceState
    priority
    customerPriority
    issueType
    state
    description
    customerReference
    reportDate
    systemComponentId
    symptom
    analysis
    solution
    ...ticketFiles
    ...ticketWebLinks
    ...ticketComments
  }
}
    ${TicketFilesFragmentDoc}
${TicketWebLinksFragmentDoc}
${TicketCommentsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketByIdGQL extends Apollo.Query<TicketByIdQuery, TicketByIdQueryVariables> {
    document = TicketByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    ticketById: 'ticketById'
  },
  Fragment: {
    ticketComment: 'ticketComment',
    ticketComments: 'ticketComments',
    comments: 'comments',
    ticketFile: 'ticketFile',
    ticketFiles: 'ticketFiles',
    ticketWebLink: 'ticketWebLink',
    ticketWebLinks: 'ticketWebLinks'
  }
}