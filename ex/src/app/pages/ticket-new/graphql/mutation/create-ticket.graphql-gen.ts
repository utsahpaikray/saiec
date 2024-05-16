import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateTicketMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  ticket: Types.TicketCreateInput;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: boolean };

export const CreateTicketDocument = gql`
    mutation createTicket($siteId: UUID!, $ticket: TicketCreateInput!) {
  createTicket(siteId: $siteId, ticket: $ticket)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTicketGQL extends Apollo.Mutation<CreateTicketMutation, CreateTicketMutationVariables> {
    document = CreateTicketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    createTicket: 'createTicket'
  }
}