import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AddDocumentToTicketMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['String'];
  document: Types.DocumentInput;
}>;


export type AddDocumentToTicketMutation = { __typename?: 'Mutation', addDocumentToTicket: boolean };

export const AddDocumentToTicketDocument = gql`
    mutation addDocumentToTicket($ticketId: String!, $document: DocumentInput!) {
  addDocumentToTicket(ticketId: $ticketId, document: $document)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddDocumentToTicketGQL extends Apollo.Mutation<AddDocumentToTicketMutation, AddDocumentToTicketMutationVariables> {
    document = AddDocumentToTicketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    addDocumentToTicket: 'addDocumentToTicket'
  }
}