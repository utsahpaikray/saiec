import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TicketFragment = { __typename?: 'Ticket', id: string, title?: string | null, sourceState?: string | null, priority?: string | null, issueType: Types.IssueType, customerPriority?: string | null, url?: string | null, state?: string | null, reportDate: any };

export type SiteTicketsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  endCursor?: Types.InputMaybe<Types.Scalars['String']>;
  sourceState?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SiteTicketsQuery = { __typename?: 'Query', tickets?: { __typename?: 'TicketsConnection', totalCount: number, nodes?: Array<{ __typename?: 'Ticket', id: string, title?: string | null, sourceState?: string | null, priority?: string | null, issueType: Types.IssueType, customerPriority?: string | null, url?: string | null, state?: string | null, reportDate: any }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export const TicketFragmentDoc = gql`
    fragment Ticket on Ticket {
  id
  title
  sourceState
  priority
  issueType
  customerPriority
  url
  state
  reportDate
}
    `;
export const SiteTicketsDocument = gql`
    query siteTickets($siteId: UUID!, $endCursor: String, $sourceState: String) {
  tickets(
    siteId: $siteId
    where: {sourceState: {neq: $sourceState}}
    order: [{reportDate: DESC}]
    first: 15
    after: $endCursor
  ) {
    nodes {
      ...Ticket
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
    ${TicketFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteTicketsGQL extends Apollo.Query<SiteTicketsQuery, SiteTicketsQueryVariables> {
    document = SiteTicketsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteTickets: 'siteTickets'
  },
  Fragment: {
    Ticket: 'Ticket'
  }
}