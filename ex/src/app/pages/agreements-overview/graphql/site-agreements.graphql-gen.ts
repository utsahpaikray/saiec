import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteAgreementFragment = { __typename?: 'Agreement', agreementId: string, endDate: any, startDate: any, contractLines: Array<{ __typename?: 'ContractLine', packageCode?: string | null }> };

export type SiteContractLineFragment = { __typename?: 'ContractLine', packageCode?: string | null };

export type SiteAgreementsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  currentDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
}>;


export type SiteAgreementsQuery = { __typename?: 'Query', agreements: Array<{ __typename?: 'Agreement', agreementId: string, endDate: any, startDate: any, contractLines: Array<{ __typename?: 'ContractLine', packageCode?: string | null }> }> };

export const SiteContractLineFragmentDoc = gql`
    fragment siteContractLine on ContractLine {
  packageCode
}
    `;
export const SiteAgreementFragmentDoc = gql`
    fragment siteAgreement on Agreement {
  agreementId
  endDate
  startDate
  contractLines {
    ...siteContractLine
  }
}
    ${SiteContractLineFragmentDoc}`;
export const SiteAgreementsDocument = gql`
    query siteAgreements($siteId: UUID!, $currentDate: DateTime) {
  agreements(
    siteId: $siteId
    where: {startDate: {lte: $currentDate}, endDate: {gte: $currentDate}}
  ) {
    ...siteAgreement
  }
}
    ${SiteAgreementFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteAgreementsGQL extends Apollo.Query<SiteAgreementsQuery, SiteAgreementsQueryVariables> {
    document = SiteAgreementsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteAgreements: 'siteAgreements'
  },
  Fragment: {
    siteAgreement: 'siteAgreement',
    siteContractLine: 'siteContractLine'
  }
}