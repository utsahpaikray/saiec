export interface AccountManagerContact {
  alternativeContactTitle?: string
  emailAddress?: string
  name?: string
  phoneNumber?: string
  show: boolean
  userId: string
}
export interface ContractManagerContact {
  alternativeContactTitle?: string
  emailAddress?: string
  name?: string
  phoneNumber?: string
  userId?: string
}
export interface ItManagerContact {
  alternativeContactTitle?: string
  emailAddress?: string
  name?: string
  phoneNumber?: string
  show: boolean
  userId?: string
}
export interface ServiceDeskContact {
  alternativeContactTitle?: string
  emailAddress?: string
  name?: string
  phoneNumber?: string
  phoneNumberOutsideWorkingHours?: string
  show: boolean
}
export interface SparePartsContact {
  alternativeContactTitle?: string
  emailAddress?: string
  show: boolean
}
export interface VisitingOfficeContact {
  address?: string
  alternativeContactTitle?: string
  emailAddress?: string
  name?: string
  phoneNumber?: string
  show: boolean
}
export enum WorkOrderPromotionRule {
  Manual = 'manual',
  Automatic = 'automatic'
}
export interface CasesConfig {
  divertHealthWorkOrderPromotionRule: WorkOrderPromotionRule
  monitronWorkOrderPromotionRule: WorkOrderPromotionRule
  shuttleHealthWorkOrderPromotionRule: WorkOrderPromotionRule
  vidiWorkOrderPromotionRule: WorkOrderPromotionRule
  enabled: boolean
}

export interface DivertHealthConfig {
  enabled: boolean
  url?: string
}
export interface ProcessInsightsConfig {
  enabled: boolean
}
export interface ShuttleHealthConfig {
  enabled: boolean
  url?: string
}

export interface SparePartsShopConfig {
  enabled: boolean
}

export interface VidiConfig {
  enabled: boolean
  vidiAppName: string
}

export interface ContractConfig {
  enabled: boolean
}

export enum SiteSegment {
  NotApplicable = 'not-applicable',
  Amazon = 'Amazon',
  Airports = 'Airports',
  Warehousing = 'warehousing',
  Parcel = 'parcel'
}

export interface SiteProject {
  id?: string
  name?: string
  projectNumber: number
  segment: SiteSegment
}

export interface SiteDetails {
  contacts: {
    accountManager?: AccountManagerContact
    contractManager?: ContractManagerContact
    itManager?: ItManagerContact
    serviceDesk?: ServiceDeskContact
    sparePart?: SparePartsContact
    visitingOffice?: VisitingOfficeContact
  }
  configs: SiteDetailConfig
  projects: SiteProject[]
  name: string
  published: boolean
  sourceId: string
  id: string
}
export interface SiteDetailConfig {
  cases: CasesConfig
  divertHealth: DivertHealthConfig
  processInsights: ProcessInsightsConfig
  shuttleHealth: ShuttleHealthConfig
  sparePartsShop: SparePartsShopConfig
  vidi: VidiConfig
  contract: ContractConfig
}

export interface Site {
  id: string
  name: string
  segments: SiteSegment[]
  published: boolean
  sourceId: string
}

export interface SiteConfigPayload {
  siteId: string
  monitronWorkOrderPromotionRule: WorkOrderPromotionRule
  divertHealthWorkOrderPromotionRule: WorkOrderPromotionRule
  shuttleHealthWorkOrderPromotionRule: WorkOrderPromotionRule
  vidiWorkOrderPromotionRule: WorkOrderPromotionRule
  casesEnabled: boolean
  vidiEnabled: boolean
  vidiAppName: string
  contractEnabled: boolean
  divertHealthEnabled: boolean
  divertHealthUrl: string
  shuttleHealthEnabled: boolean
  shuttleHealthUrl: string
  SparePartsShopEnabled: boolean
  ProcessInsightsEnabled: boolean
}
