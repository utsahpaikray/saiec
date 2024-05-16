import { UpdateSiteConfigsMutationVariables } from '../graphql/set-site-settings.graphql-gen'
import { UserSiteDetailsQuery } from '../graphql/user-site-by-id.graphql-gen'
import {
  SiteConfigPayload,
  SiteDetails,
  SiteProject,
  SiteSegment,
  WorkOrderPromotionRule
} from '../interfaces/site-detail.interface'
import {
  WorkOrderPromotionRule as BackendWorkOrderPromotionRule,
  Project as BackendProject,
  Segment as BackendSegment
} from '@core/generated/types'

export const hasAtleasOneValueOrDefault = <T extends object, D>(
  obj: T,
  def: D
): T | D => (Object.values(obj).some((value) => !value) ? obj : def)

// @TODO - Remove Disabled rule once backend removed it.
export const mapWorkOrderPromotionRule = (
  workorderPromotionRule?: BackendWorkOrderPromotionRule
): WorkOrderPromotionRule =>
  workorderPromotionRule
    ? {
        [BackendWorkOrderPromotionRule.Automatic]:
          WorkOrderPromotionRule.Automatic,
        [BackendWorkOrderPromotionRule.Disabled]: WorkOrderPromotionRule.Manual,
        [BackendWorkOrderPromotionRule.Manual]: WorkOrderPromotionRule.Manual
      }[workorderPromotionRule]
    : WorkOrderPromotionRule.Manual

export const mapSegment = (segment: BackendSegment): SiteSegment =>
  ({
    [BackendSegment.Airports]: SiteSegment.Airports,
    [BackendSegment.Amazon]: SiteSegment.Amazon,
    [BackendSegment.NotApplicable]: SiteSegment.NotApplicable,
    [BackendSegment.Parcel]: SiteSegment.Parcel,
    [BackendSegment.Warehousing]: SiteSegment.Warehousing
  })[segment]

export const mapProject = (project: BackendProject): SiteProject => ({
  id: project.id,
  name: project.name,
  projectNumber: project.projectNumber,
  segment: mapSegment(project.segment)
})

export const mapUserSiteDetails = (
  userSiteDetails: UserSiteDetailsQuery
): SiteDetails => {
  const site = userSiteDetails.me.relatedPortalData?.AccessibleSites.at(0)
  if (!site) {
    throw new Error(`Response contains 0 sites`)
  }
  return {
    contacts: {
      accountManager: hasAtleasOneValueOrDefault(
        {
          alternativeContactTitle:
            site.accountManagerContact.alternativeContactTitle ?? undefined,
          emailAddress: site.accountManagerContact.emailAddress ?? undefined,
          name: site.accountManagerContact.name ?? undefined,
          phoneNumber: site.accountManagerContact.phoneNumber ?? undefined,
          show: site.accountManagerContact.show,
          userId: site.accountManagerContact.userId
        },
        undefined
      ),
      contractManager: hasAtleasOneValueOrDefault(
        {
          alternativeContactTitle:
            site.contractManagerContact.alternativeContactTitle ?? undefined,
          emailAddress: site.contractManagerContact.emailAddress ?? undefined,
          name: site.contractManagerContact.name ?? undefined,
          phoneNumber: site.contractManagerContact.phoneNumber ?? undefined,
          userId:
            typeof site.itManagerContact.userId === 'string'
              ? site.itManagerContact.userId
              : undefined
        },
        undefined
      ),
      itManager: hasAtleasOneValueOrDefault(
        {
          alternativeContactTitle:
            site.itManagerContact.alternativeContactTitle ?? undefined,
          emailAddress: site.itManagerContact.emailAddress ?? undefined,
          name: site.itManagerContact.name ?? undefined,
          phoneNumber: site.itManagerContact.phoneNumber ?? undefined,
          show: site.itManagerContact.show,
          userId:
            typeof site.itManagerContact.userId === 'string'
              ? site.itManagerContact.userId
              : undefined
        },
        undefined
      ),
      serviceDesk: hasAtleasOneValueOrDefault(
        {
          alternativeContactTitle:
            site.serviceDeskContact.alternativeContactTitle ?? undefined,
          emailAddress: site.serviceDeskContact.emailAddress ?? undefined,
          name: site.serviceDeskContact.name ?? undefined,
          phoneNumber: site.serviceDeskContact.phoneNumber ?? undefined,
          phoneNumberOutsideWorkingHours:
            site.serviceDeskContact.phoneNumberOutsideWorkingHours ?? undefined,
          show: site.serviceDeskContact.show
        },
        undefined
      ),
      sparePart: hasAtleasOneValueOrDefault(
        {
          alternativeContactTitle:
            site.sparePartsContact.alternativeContactTitle ?? undefined,
          emailAddress: site.sparePartsContact.emailAddress ?? undefined,
          show: site.sparePartsContact.show
        },
        undefined
      ),
      visitingOffice: hasAtleasOneValueOrDefault(
        {
          address: site.visitingOfficeContact.address ?? undefined,
          alternativeContactTitle:
            site.visitingOfficeContact.alternativeContactTitle ?? undefined,
          emailAddress: site.visitingOfficeContact.email ?? undefined,
          name: site.visitingOfficeContact.name ?? undefined,
          phoneNumber: site.visitingOfficeContact.phoneNumber ?? undefined,
          show: site.visitingOfficeContact.show
        },
        undefined
      )
    },
    configs: {
      cases: {
        enabled: site.casesConfig.enabled,
        divertHealthWorkOrderPromotionRule: mapWorkOrderPromotionRule(
          site.casesConfig.divertHealthWorkOrderPromotionRule
        ),
        monitronWorkOrderPromotionRule: mapWorkOrderPromotionRule(
          site.casesConfig.monitronWorkOrderPromotionRule
        ),
        shuttleHealthWorkOrderPromotionRule: mapWorkOrderPromotionRule(
          site.casesConfig.shuttleHealthWorkOrderPromotionRule
        ),
        vidiWorkOrderPromotionRule: mapWorkOrderPromotionRule(
          site.casesConfig.vidiWorkOrderPromotionRule
        )
      },
      divertHealth: {
        enabled: site.divertHealthConfig.enabled,
        url: site.divertHealthConfig.url ?? undefined
      },
      processInsights: {
        enabled: site.processInsightsConfig.enabled
      },
      shuttleHealth: {
        enabled: site.shuttleHealthConfig.enabled,
        url: site.shuttleHealthConfig.url ?? undefined
      },
      sparePartsShop: {
        enabled: site.sparePartsShopConfig.enabled
      },
      vidi: {
        enabled: site.vidiConfig.enabled,
        vidiAppName: site.vidiConfig.vidiAppName
      },
      contract: {
        enabled: site.contractVisible
      }
    },
    name: site.name,
    projects: site.projects.map(mapProject),
    published: site.published,
    sourceId: site.sourceId,
    id: site.id
  }
}

export const mapBackendWorkOrderPromotionRule = (
  workorderPromotionRule: WorkOrderPromotionRule
): BackendWorkOrderPromotionRule =>
  ({
    [WorkOrderPromotionRule.Automatic]: BackendWorkOrderPromotionRule.Automatic,
    [WorkOrderPromotionRule.Manual]: BackendWorkOrderPromotionRule.Manual
  })[workorderPromotionRule]

export const mapUpdateSiteConfigsMutation = (
  siteConfigPayload: SiteConfigPayload
): UpdateSiteConfigsMutationVariables => ({
  siteId: siteConfigPayload.siteId,
  monitronWorkOrderPromotionRule: mapBackendWorkOrderPromotionRule(
    siteConfigPayload.monitronWorkOrderPromotionRule
  ),
  divertHealthWorkOrderPromotionRule: mapBackendWorkOrderPromotionRule(
    siteConfigPayload.divertHealthWorkOrderPromotionRule
  ),
  shuttleHealthWorkOrderPromotionRule: mapBackendWorkOrderPromotionRule(
    siteConfigPayload.shuttleHealthWorkOrderPromotionRule
  ),
  vidiWorkOrderPromotionRule: mapBackendWorkOrderPromotionRule(
    siteConfigPayload.vidiWorkOrderPromotionRule
  ),
  casesEnabled: siteConfigPayload.casesEnabled,
  vidiEnabled: siteConfigPayload.vidiEnabled,
  vidiAppName: siteConfigPayload.vidiAppName,
  contractEnabled: siteConfigPayload.contractEnabled,
  divertHealthEnabled: siteConfigPayload.divertHealthEnabled,
  divertHealthUrl: siteConfigPayload.divertHealthEnabled
    ? siteConfigPayload.divertHealthUrl
    : '',
  shuttleHealthEnabled: siteConfigPayload.shuttleHealthEnabled,
  shuttleHealthUrl: siteConfigPayload.shuttleHealthEnabled
    ? siteConfigPayload.shuttleHealthUrl
    : '',
  SparePartsShopEnabled: siteConfigPayload.SparePartsShopEnabled,
  ProcessInsightsEnabled: siteConfigPayload.ProcessInsightsEnabled
})
