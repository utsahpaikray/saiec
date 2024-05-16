import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { MaximoSiteContactFragmentDoc } from '../../../pages/ticket-new/graphql/site-ticket-info.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteTicketContactsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteTicketContactsQuery = { __typename?: 'Query', ticketingSiteInfo: { __typename?: 'TicketingSiteInfo', contacts: Array<{ __typename?: 'MaximoSiteContact', id: string, name: string, email: string, phone: string }> } };

export const SiteTicketContactsDocument = gql`
    query siteTicketContacts($siteId: UUID!) {
  ticketingSiteInfo(siteId: $siteId) {
    contacts {
      ...maximoSiteContact
    }
  }
}
    ${MaximoSiteContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteTicketContactsGQL extends Apollo.Query<SiteTicketContactsQuery, SiteTicketContactsQueryVariables> {
    document = SiteTicketContactsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteTicketContacts: 'siteTicketContacts'
  }
}