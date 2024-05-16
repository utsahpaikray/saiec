import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
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


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserSiteDetailsQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserSiteDetailsQuery = (resolver: GraphQLResponseResolver<UserSiteDetailsQuery, UserSiteDetailsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<UserSiteDetailsQuery, UserSiteDetailsQueryVariables>(
    'userSiteDetails',
    resolver,
    options
  )
