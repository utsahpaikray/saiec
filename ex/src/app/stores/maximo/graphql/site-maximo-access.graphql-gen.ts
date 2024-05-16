import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteMaximoAccessQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteMaximoAccessQuery = { __typename?: 'Query', maximoAccess: { __typename?: 'MaximoUserAccess', canReadTickets: boolean, canWriteTickets: boolean } };

export const SiteMaximoAccessDocument = gql`
    query siteMaximoAccess($siteId: UUID!) {
  maximoAccess(siteId: $siteId) {
    canReadTickets
    canWriteTickets
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteMaximoAccessGQL extends Apollo.Query<SiteMaximoAccessQuery, SiteMaximoAccessQueryVariables> {
    document = SiteMaximoAccessDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteMaximoAccess: 'siteMaximoAccess'
  }
}