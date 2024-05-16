import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteTicketLanguageCodeQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteTicketLanguageCodeQuery = { __typename?: 'Query', ticketingSiteInfo: { __typename?: 'TicketingSiteInfo', languageCode: string } };

export const SiteTicketLanguageCodeDocument = gql`
    query siteTicketLanguageCode($siteId: UUID!) {
  ticketingSiteInfo(siteId: $siteId) {
    languageCode
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteTicketLanguageCodeGQL extends Apollo.Query<SiteTicketLanguageCodeQuery, SiteTicketLanguageCodeQueryVariables> {
    document = SiteTicketLanguageCodeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteTicketLanguageCode: 'siteTicketLanguageCode'
  }
}