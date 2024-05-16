import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteByIdContractManagerQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteByIdContractManagerQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', contractManagerContact: { __typename?: 'ContractManagerContact', emailAddress?: string | null } }> };

export const SiteByIdContractManagerDocument = gql`
    query siteByIdContractManager($siteId: UUID!) {
  sites(where: {id: {eq: $siteId}}) {
    contractManagerContact {
      emailAddress
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteByIdContractManagerGQL extends Apollo.Query<SiteByIdContractManagerQuery, SiteByIdContractManagerQueryVariables> {
    document = SiteByIdContractManagerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteByIdContractManager: 'siteByIdContractManager'
  }
}