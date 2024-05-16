import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { TicketWebLinksFragmentDoc } from './ticket-by-id.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TicketWebLinksQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  webLinksFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  webLinksCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketWebLinksQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', webLinks?: { __typename?: 'WebLinksConnection', totalCount: number, nodes?: Array<{ __typename?: 'WebLink', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };

export const TicketWebLinksDocument = gql`
    query ticketWebLinks($id: String!, $webLinksFirst: Int = 5, $webLinksCursor: String) {
  ticket(id: $id) {
    ...ticketWebLinks
  }
}
    ${TicketWebLinksFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketWebLinksGQL extends Apollo.Query<TicketWebLinksQuery, TicketWebLinksQueryVariables> {
    document = TicketWebLinksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    ticketWebLinks: 'ticketWebLinks'
  }
}