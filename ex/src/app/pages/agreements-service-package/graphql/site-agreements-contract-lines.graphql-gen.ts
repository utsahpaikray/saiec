import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ContractLineInfoFragment = { __typename?: 'ContractLine', startDate: any, endDate: any, partsIncluded?: boolean | null, laborIncluded?: boolean | null, hours: number, days: number, packageCode?: string | null, byphone?: number | null, onsite?: number | null, yearvisits?: number | null, vidays?: number | null, subcdays?: number | null, calendarDescription?: string | null, systemComponent?: { __typename?: 'SystemComponent', system?: string | null, markCode?: string | null, markCodeDescription?: string | null, assetType?: string | null, assetMarkNumber?: string | null, assetTypeDescription?: string | null } | null };

export type SiteAgreementsContractLinesQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  currentDate?: Types.InputMaybe<Types.Scalars['DateTime']>;
  packageCodes?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type SiteAgreementsContractLinesQuery = { __typename?: 'Query', agreements: Array<{ __typename?: 'Agreement', contractLines: Array<{ __typename?: 'ContractLine', startDate: any, endDate: any, partsIncluded?: boolean | null, laborIncluded?: boolean | null, hours: number, days: number, packageCode?: string | null, byphone?: number | null, onsite?: number | null, yearvisits?: number | null, vidays?: number | null, subcdays?: number | null, calendarDescription?: string | null, systemComponent?: { __typename?: 'SystemComponent', system?: string | null, markCode?: string | null, markCodeDescription?: string | null, assetType?: string | null, assetMarkNumber?: string | null, assetTypeDescription?: string | null } | null }> }> };

export const ContractLineInfoFragmentDoc = gql`
    fragment ContractLineInfo on ContractLine {
  startDate
  endDate
  partsIncluded
  laborIncluded
  hours
  days
  packageCode
  byphone
  onsite
  yearvisits
  vidays
  subcdays
  calendarDescription
  systemComponent {
    system
    markCode
    markCodeDescription
    assetType
    assetMarkNumber
    assetTypeDescription
  }
}
    `;
export const SiteAgreementsContractLinesDocument = gql`
    query siteAgreementsContractLines($siteId: UUID!, $currentDate: DateTime, $packageCodes: [String]) {
  agreements(
    siteId: $siteId
    where: {startDate: {lte: $currentDate}, endDate: {gte: $currentDate}}
  ) {
    contractLines(where: {packageCode: {in: $packageCodes}}) {
      ...ContractLineInfo
    }
  }
}
    ${ContractLineInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteAgreementsContractLinesGQL extends Apollo.Query<SiteAgreementsContractLinesQuery, SiteAgreementsContractLinesQueryVariables> {
    document = SiteAgreementsContractLinesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteAgreementsContractLines: 'siteAgreementsContractLines'
  },
  Fragment: {
    ContractLineInfo: 'ContractLineInfo'
  }
}