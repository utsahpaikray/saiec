import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UpdateSiteConfigsMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  monitronWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  divertHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  shuttleHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  vidiWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  casesEnabled: Types.Scalars['Boolean'];
  vidiEnabled: Types.Scalars['Boolean'];
  vidiAppName: Types.Scalars['String'];
  contractEnabled: Types.Scalars['Boolean'];
  divertHealthEnabled: Types.Scalars['Boolean'];
  divertHealthUrl: Types.Scalars['String'];
  shuttleHealthEnabled: Types.Scalars['Boolean'];
  shuttleHealthUrl: Types.Scalars['String'];
  SparePartsShopEnabled: Types.Scalars['Boolean'];
  ProcessInsightsEnabled: Types.Scalars['Boolean'];
}>;


export type UpdateSiteConfigsMutation = { __typename?: 'Mutation', editCasesConfig: boolean, editVidiConfig: boolean, editContractVisible: boolean, editDivertHealthConfig: boolean, editShuttleHealthConfig: boolean, editSparePartsShopConfig: boolean, editProcessInsightsConfig: boolean };

export const UpdateSiteConfigsDocument = gql`
    mutation updateSiteConfigs($siteId: UUID!, $monitronWorkOrderPromotionRule: WorkOrderPromotionRule!, $divertHealthWorkOrderPromotionRule: WorkOrderPromotionRule!, $shuttleHealthWorkOrderPromotionRule: WorkOrderPromotionRule!, $vidiWorkOrderPromotionRule: WorkOrderPromotionRule!, $casesEnabled: Boolean!, $vidiEnabled: Boolean!, $vidiAppName: String!, $contractEnabled: Boolean!, $divertHealthEnabled: Boolean!, $divertHealthUrl: String!, $shuttleHealthEnabled: Boolean!, $shuttleHealthUrl: String!, $SparePartsShopEnabled: Boolean!, $ProcessInsightsEnabled: Boolean!) {
  editCasesConfig(
    siteId: $siteId
    enabled: $casesEnabled
    monitronWorkOrderPromotionRule: $monitronWorkOrderPromotionRule
    divertHealthWorkOrderPromotionRule: $divertHealthWorkOrderPromotionRule
    shuttleHealthWorkOrderPromotionRule: $shuttleHealthWorkOrderPromotionRule
    vidiWorkOrderPromotionRule: $vidiWorkOrderPromotionRule
  )
  editVidiConfig(
    siteId: $siteId
    enabled: $vidiEnabled
    vidiAppName: $vidiAppName
  )
  editContractVisible(visible: $contractEnabled, siteId: $siteId)
  editDivertHealthConfig(
    siteId: $siteId
    enabled: $divertHealthEnabled
    url: $divertHealthUrl
  )
  editShuttleHealthConfig(
    siteId: $siteId
    enabled: $shuttleHealthEnabled
    url: $shuttleHealthUrl
  )
  editSparePartsShopConfig(siteId: $siteId, enabled: $SparePartsShopEnabled)
  editProcessInsightsConfig(siteId: $siteId, enabled: $ProcessInsightsEnabled)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSiteConfigsGQL extends Apollo.Mutation<UpdateSiteConfigsMutation, UpdateSiteConfigsMutationVariables> {
    document = UpdateSiteConfigsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    updateSiteConfigs: 'updateSiteConfigs'
  }
}