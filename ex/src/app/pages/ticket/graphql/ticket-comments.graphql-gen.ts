import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { TicketCommentsFragmentDoc } from './ticket-by-id.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TicketCommentsQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  commentsFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  commentsCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketCommentsQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', comments?: { __typename?: 'CommentsConnection', nodes?: Array<{ __typename?: 'Comment', maximoCommentID: string, description: string, timeStamp: any, author?: string | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };

export const TicketCommentsDocument = gql`
    query ticketComments($id: String!, $commentsFirst: Int = 4, $commentsCursor: String) {
  ticket(id: $id) {
    ...ticketComments
  }
}
    ${TicketCommentsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketCommentsGQL extends Apollo.Query<TicketCommentsQuery, TicketCommentsQueryVariables> {
    document = TicketCommentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    ticketComments: 'ticketComments'
  }
}