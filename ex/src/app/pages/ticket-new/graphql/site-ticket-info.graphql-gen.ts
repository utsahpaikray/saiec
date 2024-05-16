import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SitePriorityFragment = { __typename?: 'SitePriority', description: string, value: string };

export type MaximoSiteContactFragment = { __typename?: 'MaximoSiteContact', id: string, name: string, email: string, phone: string };

export type SiteTicketInfoQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteTicketInfoQuery = { __typename?: 'Query', ticketingSiteInfo: { __typename?: 'TicketingSiteInfo', languageCode: string, priorities: Array<{ __typename?: 'SitePriority', description: string, value: string }>, contacts: Array<{ __typename?: 'MaximoSiteContact', id: string, name: string, email: string, phone: string }> } };

export const SitePriorityFragmentDoc = gql`
    fragment sitePriority on SitePriority {
  description
  value
}
    `;
export const MaximoSiteContactFragmentDoc = gql`
    fragment maximoSiteContact on MaximoSiteContact {
  id
  name
  email
  phone
}
    `;
export const SiteTicketInfoDocument = gql`
    query siteTicketInfo($siteId: UUID!) {
  ticketingSiteInfo(siteId: $siteId) {
    priorities {
      ...sitePriority
    }
    contacts {
      ...maximoSiteContact
    }
    languageCode
  }
}
    ${SitePriorityFragmentDoc}
${MaximoSiteContactFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteTicketInfoGQL extends Apollo.Query<SiteTicketInfoQuery, SiteTicketInfoQueryVariables> {
    document = SiteTicketInfoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteTicketInfo: 'siteTicketInfo'
  },
  Fragment: {
    sitePriority: 'sitePriority',
    maximoSiteContact: 'maximoSiteContact'
  }
}