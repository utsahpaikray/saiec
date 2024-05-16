import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { TicketFilesFragmentDoc } from './ticket-by-id.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TicketFilesQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  filesFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  filesCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketFilesQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', files?: { __typename?: 'FilesConnection', totalCount: number, nodes?: Array<{ __typename?: 'File', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };

export const TicketFilesDocument = gql`
    query ticketFiles($id: String!, $filesFirst: Int = 5, $filesCursor: String) {
  ticket(id: $id) {
    ...ticketFiles
  }
}
    ${TicketFilesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TicketFilesGQL extends Apollo.Query<TicketFilesQuery, TicketFilesQueryVariables> {
    document = TicketFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    ticketFiles: 'ticketFiles'
  }
}