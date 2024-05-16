import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AddCommentToTicketMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  description: Types.Scalars['String'];
  longDescription?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AddCommentToTicketMutation = { __typename?: 'Mutation', addCommentToTicket: boolean };

export const AddCommentToTicketDocument = gql`
    mutation addCommentToTicket($id: String!, $description: String!, $longDescription: String) {
  addCommentToTicket(
    ticketId: $id
    description: $description
    longDescription: $longDescription
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddCommentToTicketGQL extends Apollo.Mutation<AddCommentToTicketMutation, AddCommentToTicketMutationVariables> {
    document = AddCommentToTicketDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    addCommentToTicket: 'addCommentToTicket'
  }
}