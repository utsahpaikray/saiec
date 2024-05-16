import * as Types from '../../../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ExternalUserAccountQueryVariables = Types.Exact<{
  upn: Types.Scalars['String'];
}>;


export type ExternalUserAccountQuery = { __typename?: 'Query', externalUserAccount: { __typename?: 'GraphUser', id: string, username: string, firstName: string, lastName: string, email: string, accountEnabled: boolean, customerEmail: string } };

export const ExternalUserAccountDocument = gql`
    query externalUserAccount($upn: String!) {
  externalUserAccount(upn: $upn) {
    id
    username
    firstName
    lastName
    email
    accountEnabled
    customerEmail
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExternalUserAccountGQL extends Apollo.Query<ExternalUserAccountQuery, ExternalUserAccountQueryVariables> {
    document = ExternalUserAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    externalUserAccount: 'externalUserAccount'
  }
}