import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type AccountManagerContactFragmentFragment = { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean, userId?: any | null };

export type CasesConfigFragmentFragment = { __typename?: 'CasesConfig', divertHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule, enabled: boolean, monitronWorkOrderPromotionRule: Types.WorkOrderPromotionRule, shuttleHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule, vidiWorkOrderPromotionRule: Types.WorkOrderPromotionRule };

export type ContractManagerContactFragmentFragment = { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, userId?: any | null };

export type ItManagerContactFragmentFragment = { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean, userId?: any | null };

export type DivertHealthConfigFragmentFragment = { __typename?: 'DivertHealthConfig', enabled: boolean, url?: string | null };

export type ProcessInsightsConfigFragmentFragment = { __typename?: 'ProcessInsightsConfig', enabled: boolean };

export type ServiceDeskContactFragmentFragment = { __typename?: 'ServiceDeskContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean };

export type ShuttleHealthConfigFragmentFragment = { __typename?: 'ShuttleHealthConfig', enabled: boolean, url?: string | null };

export type SparePartsContactFragmentFragment = { __typename?: 'SparePartsContact', alternativeContactTitle?: string | null, emailAddress?: string | null, show: boolean };

export type SparePartsShopConfigFragmentFragment = { __typename?: 'SparePartsShopConfig', enabled: boolean };

export type VidiConfigFragmentFragment = { __typename?: 'VidiConfig', enabled: boolean, vidiAppName: string };

export type VisitingOfficeContactFragmentFragment = { __typename?: 'VisitingOfficeContact', address?: string | null, alternativeContactTitle?: string | null, email?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean };

export type ProjectFragmentFragment = { __typename?: 'Project', id: any, name: string, projectNumber: number, segment: Types.Segment };

export type SiteDetailsFragmentFragment = { __typename?: 'Site', contractVisible: boolean, id: any, name: string, published: boolean, sourceId: string, accountManagerContact: { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean, userId?: any | null }, casesConfig: { __typename?: 'CasesConfig', divertHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule, enabled: boolean, monitronWorkOrderPromotionRule: Types.WorkOrderPromotionRule, shuttleHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule, vidiWorkOrderPromotionRule: Types.WorkOrderPromotionRule }, contractManagerContact: { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, userId?: any | null }, divertHealthConfig: { __typename?: 'DivertHealthConfig', enabled: boolean, url?: string | null }, itManagerContact: { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean, userId?: any | null }, processInsightsConfig: { __typename?: 'ProcessInsightsConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', id: any, name: string, projectNumber: number, segment: Types.Segment }>, serviceDeskContact: { __typename?: 'ServiceDeskContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean }, shuttleHealthConfig: { __typename?: 'ShuttleHealthConfig', enabled: boolean, url?: string | null }, sparePartsContact: { __typename?: 'SparePartsContact', alternativeContactTitle?: string | null, emailAddress?: string | null, show: boolean }, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean, vidiAppName: string }, visitingOfficeContact: { __typename?: 'VisitingOfficeContact', address?: string | null, alternativeContactTitle?: string | null, email?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean } };

export type UserSiteDetailsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteDetailsQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', contractVisible: boolean, id: any, name: string, published: boolean, sourceId: string, accountManagerContact: { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean, userId?: any | null }, casesConfig: { __typename?: 'CasesConfig', divertHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule, enabled: boolean, monitronWorkOrderPromotionRule: Types.WorkOrderPromotionRule, shuttleHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule, vidiWorkOrderPromotionRule: Types.WorkOrderPromotionRule }, contractManagerContact: { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, userId?: any | null }, divertHealthConfig: { __typename?: 'DivertHealthConfig', enabled: boolean, url?: string | null }, itManagerContact: { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean, userId?: any | null }, processInsightsConfig: { __typename?: 'ProcessInsightsConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', id: any, name: string, projectNumber: number, segment: Types.Segment }>, serviceDeskContact: { __typename?: 'ServiceDeskContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean }, shuttleHealthConfig: { __typename?: 'ShuttleHealthConfig', enabled: boolean, url?: string | null }, sparePartsContact: { __typename?: 'SparePartsContact', alternativeContactTitle?: string | null, emailAddress?: string | null, show: boolean }, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean, vidiAppName: string }, visitingOfficeContact: { __typename?: 'VisitingOfficeContact', address?: string | null, alternativeContactTitle?: string | null, email?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean } }> } | null } };

export const AccountManagerContactFragmentFragmentDoc = gql`
    fragment AccountManagerContactFragment on AccountManagerContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
  show
  userId
}
    `;
export const CasesConfigFragmentFragmentDoc = gql`
    fragment CasesConfigFragment on CasesConfig {
  divertHealthWorkOrderPromotionRule
  enabled
  monitronWorkOrderPromotionRule
  shuttleHealthWorkOrderPromotionRule
  vidiWorkOrderPromotionRule
}
    `;
export const ContractManagerContactFragmentFragmentDoc = gql`
    fragment ContractManagerContactFragment on ContractManagerContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
  userId
}
    `;
export const DivertHealthConfigFragmentFragmentDoc = gql`
    fragment DivertHealthConfigFragment on DivertHealthConfig {
  enabled
  url
}
    `;
export const ItManagerContactFragmentFragmentDoc = gql`
    fragment ItManagerContactFragment on ItManagerContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
  show
  userId
}
    `;
export const ProcessInsightsConfigFragmentFragmentDoc = gql`
    fragment ProcessInsightsConfigFragment on ProcessInsightsConfig {
  enabled
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  name
  projectNumber
  segment
}
    `;
export const ServiceDeskContactFragmentFragmentDoc = gql`
    fragment ServiceDeskContactFragment on ServiceDeskContact {
  alternativeContactTitle
  emailAddress
  name
  phoneNumber
  phoneNumberOutsideWorkingHours
  show
}
    `;
export const ShuttleHealthConfigFragmentFragmentDoc = gql`
    fragment ShuttleHealthConfigFragment on ShuttleHealthConfig {
  enabled
  url
}
    `;
export const SparePartsContactFragmentFragmentDoc = gql`
    fragment SparePartsContactFragment on SparePartsContact {
  alternativeContactTitle
  emailAddress
  show
}
    `;
export const SparePartsShopConfigFragmentFragmentDoc = gql`
    fragment SparePartsShopConfigFragment on SparePartsShopConfig {
  enabled
}
    `;
export const VidiConfigFragmentFragmentDoc = gql`
    fragment VidiConfigFragment on VidiConfig {
  enabled
  vidiAppName
}
    `;
export const VisitingOfficeContactFragmentFragmentDoc = gql`
    fragment VisitingOfficeContactFragment on VisitingOfficeContact {
  address
  alternativeContactTitle
  email
  name
  phoneNumber
  show
}
    `;
export const SiteDetailsFragmentFragmentDoc = gql`
    fragment SiteDetailsFragment on Site {
  accountManagerContact {
    ...AccountManagerContactFragment
  }
  casesConfig {
    ...CasesConfigFragment
  }
  contractManagerContact {
    ...ContractManagerContactFragment
  }
  contractVisible
  divertHealthConfig {
    ...DivertHealthConfigFragment
  }
  id
  itManagerContact {
    ...ItManagerContactFragment
  }
  name
  processInsightsConfig {
    ...ProcessInsightsConfigFragment
  }
  projects {
    ...ProjectFragment
  }
  published
  serviceDeskContact {
    ...ServiceDeskContactFragment
  }
  shuttleHealthConfig {
    ...ShuttleHealthConfigFragment
  }
  sourceId
  sparePartsContact {
    ...SparePartsContactFragment
  }
  sparePartsShopConfig {
    ...SparePartsShopConfigFragment
  }
  vidiConfig {
    ...VidiConfigFragment
  }
  visitingOfficeContact {
    ...VisitingOfficeContactFragment
  }
}
    ${AccountManagerContactFragmentFragmentDoc}
${CasesConfigFragmentFragmentDoc}
${ContractManagerContactFragmentFragmentDoc}
${DivertHealthConfigFragmentFragmentDoc}
${ItManagerContactFragmentFragmentDoc}
${ProcessInsightsConfigFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}
${ServiceDeskContactFragmentFragmentDoc}
${ShuttleHealthConfigFragmentFragmentDoc}
${SparePartsContactFragmentFragmentDoc}
${SparePartsShopConfigFragmentFragmentDoc}
${VidiConfigFragmentFragmentDoc}
${VisitingOfficeContactFragmentFragmentDoc}`;
export const UserSiteDetailsDocument = gql`
    query userSiteDetails($siteId: UUID!) {
  me {
    relatedPortalData {
      AccessibleSites(where: {id: {eq: $siteId}}) {
        ...SiteDetailsFragment
      }
    }
  }
}
    ${SiteDetailsFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSiteDetailsGQL extends Apollo.Query<UserSiteDetailsQuery, UserSiteDetailsQueryVariables> {
    document = UserSiteDetailsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSiteDetails: 'userSiteDetails'
  },
  Fragment: {
    AccountManagerContactFragment: 'AccountManagerContactFragment',
    CasesConfigFragment: 'CasesConfigFragment',
    ContractManagerContactFragment: 'ContractManagerContactFragment',
    ItManagerContactFragment: 'ItManagerContactFragment',
    DivertHealthConfigFragment: 'DivertHealthConfigFragment',
    ProcessInsightsConfigFragment: 'ProcessInsightsConfigFragment',
    ServiceDeskContactFragment: 'ServiceDeskContactFragment',
    ShuttleHealthConfigFragment: 'ShuttleHealthConfigFragment',
    SparePartsContactFragment: 'SparePartsContactFragment',
    SparePartsShopConfigFragment: 'SparePartsShopConfigFragment',
    VidiConfigFragment: 'VidiConfigFragment',
    VisitingOfficeContactFragment: 'VisitingOfficeContactFragment',
    ProjectFragment: 'ProjectFragment',
    SiteDetailsFragment: 'SiteDetailsFragment'
  }
}