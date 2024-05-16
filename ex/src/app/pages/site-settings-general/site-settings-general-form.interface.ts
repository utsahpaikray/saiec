import { FormControl, FormGroup } from '@angular/forms'
import { SiteSettingFormValue } from './components/site-setting-form/site-setting-form.interface'

export enum EventSources {
  Monitron = 'monitron',
  ShuttleHealth = 'shuttle-health',
  DivertHealth = 'divert-health',
  OperationalAwareness = 'operational-awareness'
}

export enum EventSourceStateRules {
  automatic = 'automatic',
  disabled = 'disabled',
  manual = 'manual'
}

export interface SiteSettingGeneralVM {
  siteSettingFormValue: SiteSettingFormValue
}

export type SiteSettingsGeneralForm = FormGroup<{
  sparePartsAccount: FormControl<boolean>
  vidi: FormControl<boolean>
  myContracts: FormControl<boolean>
  processInsights: FormControl<boolean>
  divertHealth: FormControl<boolean>
  shuttleHealth: FormControl<boolean>
  divertHealthUrl: FormControl<string>
  shuttleHealthUrl: FormControl<string>
  cases: FormGroup<{
    enabled: FormControl<boolean>
    EventSources: FormGroup
  }>
}>
