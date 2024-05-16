import { FormControl, FormGroup } from '@angular/forms'

export enum EventSources {
  Monitron = 'monitron',
  ShuttleHealth = 'shuttle-health',
  DivertHealth = 'divert-health',
  OperationalAwareness = 'operational-awareness'
}

export enum WorkOrderPromotionRule {
  Manual = 'manual',
  Automatic = 'automatic'
}

export interface SiteSettingFormValue {
  [SiteSetting.SpareParts]: boolean
  [SiteSetting.Vidi]: boolean
  [SiteSetting.MyContracts]: boolean
  [SiteSetting.ProcessInsights]: boolean
  [SiteSetting.DivertHealth]: boolean
  [SiteSetting.ShuttleHealth]: boolean
  [SiteSetting.DivertHealthUrl]?: string
  [SiteSetting.ShuttleHealthUrl]?: string
  [SiteSetting.Cases]: boolean
  [SiteSetting.CasesWorkOrderPromotionalRules]?: {
    [EventSources.DivertHealth]?: WorkOrderPromotionRule
    [EventSources.ShuttleHealth]?: WorkOrderPromotionRule
    [EventSources.Monitron]?: WorkOrderPromotionRule
    [EventSources.OperationalAwareness]?: WorkOrderPromotionRule
  }
}

export type SiteSettingsGeneralFormGroupControls = {
  [SiteSetting.SpareParts]: FormControl<boolean>
  [SiteSetting.Vidi]: FormControl<boolean>
  [SiteSetting.MyContracts]: FormControl<boolean>
  [SiteSetting.ProcessInsights]: FormControl<boolean>
  [SiteSetting.DivertHealth]: FormControl<boolean>
  [SiteSetting.ShuttleHealth]: FormControl<boolean>
  [SiteSetting.DivertHealthUrl]: FormControl<string>
  [SiteSetting.ShuttleHealthUrl]: FormControl<string>
  [SiteSetting.Cases]: FormControl<boolean>
  [SiteSetting.CasesWorkOrderPromotionalRules]: FormGroup<{
    [EventSources.DivertHealth]: FormControl<WorkOrderPromotionRule>
    [EventSources.ShuttleHealth]: FormControl<WorkOrderPromotionRule>
    [EventSources.Monitron]: FormControl<WorkOrderPromotionRule>
    [EventSources.OperationalAwareness]: FormControl<WorkOrderPromotionRule>
  }>
}

export enum SiteSetting {
  SpareParts = 'sparePartsAccount',
  Vidi = 'vidi',
  ProcessInsights = 'processInsights',
  MyContracts = 'myContracts',
  DivertHealth = 'divertHealth',
  DivertHealthUrl = 'divertHealthUrl',
  ShuttleHealthUrl = 'shuttleHealthUrl',
  ShuttleHealth = 'shuttleHealth',
  Cases = 'cases',
  CasesWorkOrderPromotionalRules = 'casesWorkOrderPromotionalRules'
}
