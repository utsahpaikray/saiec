import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CaseDetailsFragment = { __typename?: 'Case', id: any, dateTimeCreated: any, assetSystemComponentId?: string | null, title: string, description?: string | null, status: Types.CaseStatus, source: Types.Source, referenceId?: string | null, messages: Array<{ __typename?: 'Message', id: any, dateTimeCreated: any, content: string, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, attachments: Array<{ __typename?: 'Attachment', id: any, name: string, description: string, dateTimeCreated: any, contentType: string, ThumbnailUrlWithToken?: string | null, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null, contactPerson?: { __typename?: 'ContactPerson', samAccountName: string, emailAddress: string, name: string } | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', id: any, dateTimeCreated: any, status: Types.CaseStatus, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }> };

export type CaseDetailsQueryVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type CaseDetailsQuery = { __typename?: 'Query', case?: { __typename?: 'Case', id: any, dateTimeCreated: any, assetSystemComponentId?: string | null, title: string, description?: string | null, status: Types.CaseStatus, source: Types.Source, referenceId?: string | null, messages: Array<{ __typename?: 'Message', id: any, dateTimeCreated: any, content: string, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, attachments: Array<{ __typename?: 'Attachment', id: any, name: string, description: string, dateTimeCreated: any, contentType: string, ThumbnailUrlWithToken?: string | null, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null, contactPerson?: { __typename?: 'ContactPerson', samAccountName: string, emailAddress: string, name: string } | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', id: any, dateTimeCreated: any, status: Types.CaseStatus, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }> } | null };

export const CaseDetailsFragmentDoc = gql`
    fragment CaseDetails on Case {
  id
  dateTimeCreated
  assetSystemComponentId
  title
  description
  status
  messages {
    id
    dateTimeCreated
    content
    author {
      userId
      firstName
      middleName
      lastName
    }
  }
  attachments {
    id
    name
    description
    dateTimeCreated
    contentType
    author {
      userId
      firstName
      middleName
      lastName
    }
    ThumbnailUrlWithToken
  }
  author {
    userId
    firstName
    middleName
    lastName
  }
  contactPerson {
    samAccountName
    emailAddress
    name
  }
  statusUpdates {
    id
    dateTimeCreated
    status
    author {
      userId
      firstName
      middleName
      lastName
    }
  }
  workOrders {
    orderNumber
  }
  source
  referenceId
}
    `;
export const CaseDetailsDocument = gql`
    query caseDetails($caseId: UUID!) {
  case(caseId: $caseId) {
    ...CaseDetails
  }
}
    ${CaseDetailsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CaseDetailsGQL extends Apollo.Query<CaseDetailsQuery, CaseDetailsQueryVariables> {
    document = CaseDetailsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    caseDetails: 'caseDetails'
  },
  Fragment: {
    CaseDetails: 'CaseDetails'
  }
}