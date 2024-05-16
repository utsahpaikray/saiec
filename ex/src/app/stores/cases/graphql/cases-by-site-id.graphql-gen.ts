import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CasesFragment = { __typename?: 'Case', id: any, status: Types.CaseStatus, type: string, title: string, source: Types.Source, dateTimeCreated: any, description?: string | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', dateTimeCreated: any }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }>, messages: Array<{ __typename?: 'Message', dateTimeCreated: any }>, attachments: Array<{ __typename?: 'Attachment', dateTimeCreated: any }>, references: Array<{ __typename?: 'Reference', dateTimeCreated: any }> };

export type CasesBySiteIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  endCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CasesBySiteIdQuery = { __typename?: 'Query', cases?: { __typename?: 'CasesConnection', nodes?: Array<{ __typename?: 'Case', id: any, status: Types.CaseStatus, type: string, title: string, source: Types.Source, dateTimeCreated: any, description?: string | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', dateTimeCreated: any }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }>, messages: Array<{ __typename?: 'Message', dateTimeCreated: any }>, attachments: Array<{ __typename?: 'Attachment', dateTimeCreated: any }>, references: Array<{ __typename?: 'Reference', dateTimeCreated: any }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export const CasesFragmentDoc = gql`
    fragment Cases on Case {
  id
  status
  type
  title
  source
  dateTimeCreated
  statusUpdates {
    dateTimeCreated
  }
  description
  workOrders {
    orderNumber
  }
  messages {
    dateTimeCreated
  }
  attachments {
    dateTimeCreated
  }
  references {
    dateTimeCreated
  }
}
    `;
export const CasesBySiteIdDocument = gql`
    query casesBySiteId($siteId: UUID!, $endCursor: String) {
  cases(
    siteId: $siteId
    order: [{dateTimeCreated: DESC}]
    first: 15
    after: $endCursor
  ) {
    nodes {
      ...Cases
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CasesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CasesBySiteIdGQL extends Apollo.Query<CasesBySiteIdQuery, CasesBySiteIdQueryVariables> {
    document = CasesBySiteIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    casesBySiteId: 'casesBySiteId'
  },
  Fragment: {
    Cases: 'Cases'
  }
}