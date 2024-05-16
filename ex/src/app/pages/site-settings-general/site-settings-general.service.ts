import { Injectable, inject } from '@angular/core'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { TranslocoService } from '@ngneat/transloco'
import { Store } from '@ngrx/store'
import { filterNull } from '@stores/operators'
import {
  SiteConfigPayload,
  SiteDetailConfig,
  WorkOrderPromotionRule as DomainWorkOrderPromotionRule
} from '@stores/site-details/interfaces/site-detail.interface'
import siteDetailActions from '@stores/site-details/site-detail.actions'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import {
  Observable,
  combineLatest,
  filter,
  map,
  of,
  switchMap,
  take
} from 'rxjs'
import {
  SiteSetting,
  SiteSettingFormValue,
  WorkOrderPromotionRule
} from './components/site-setting-form/site-setting-form.interface'
import {
  EventSources,
  SiteSettingGeneralVM
} from './site-settings-general-form.interface'

const mapFormValueToPayload = (
  siteId: string,
  formValue: SiteSettingFormValue
): SiteConfigPayload => {
  const {
    sparePartsAccount,
    vidi,
    myContracts,
    divertHealth,
    divertHealthUrl,
    shuttleHealth,
    shuttleHealthUrl,
    processInsights,
    cases,
    casesWorkOrderPromotionalRules
  } = formValue

  const monitronWorkOrderPromotionRule = mapDomainWorkOrderPromotionRule(
    casesWorkOrderPromotionalRules?.[EventSources.Monitron] ??
      WorkOrderPromotionRule.Manual
  )
  const divertHealthWorkOrderPromotionRule = mapDomainWorkOrderPromotionRule(
    casesWorkOrderPromotionalRules?.[EventSources.DivertHealth] ??
      WorkOrderPromotionRule.Manual
  )
  const shuttleHealthWorkOrderPromotionRule = mapDomainWorkOrderPromotionRule(
    casesWorkOrderPromotionalRules?.[EventSources.ShuttleHealth] ??
      WorkOrderPromotionRule.Manual
  )
  const vidiWorkOrderPromotionRule = mapDomainWorkOrderPromotionRule(
    casesWorkOrderPromotionalRules?.[EventSources.OperationalAwareness] ??
      WorkOrderPromotionRule.Manual
  )

  return {
    siteId,
    monitronWorkOrderPromotionRule,
    divertHealthWorkOrderPromotionRule,
    shuttleHealthWorkOrderPromotionRule,
    vidiWorkOrderPromotionRule,
    casesEnabled: cases,
    vidiEnabled: vidi,
    vidiAppName: '',
    contractEnabled: myContracts,
    divertHealthEnabled: divertHealth,
    divertHealthUrl: divertHealthUrl ?? '',
    shuttleHealthEnabled: shuttleHealth,
    shuttleHealthUrl: shuttleHealthUrl ?? '',
    SparePartsShopEnabled: sparePartsAccount,
    ProcessInsightsEnabled: processInsights
  }
}
const mapWorkOrderPromotionRule = (
  workOrderPromotionRule: DomainWorkOrderPromotionRule
): WorkOrderPromotionRule => {
  return {
    [DomainWorkOrderPromotionRule.Automatic]: WorkOrderPromotionRule.Automatic,
    [DomainWorkOrderPromotionRule.Manual]: WorkOrderPromotionRule.Manual
  }[workOrderPromotionRule]
}
const mapDomainWorkOrderPromotionRule = (
  workOrderPromotionRule: WorkOrderPromotionRule
): DomainWorkOrderPromotionRule => {
  return (
    {
      [WorkOrderPromotionRule.Automatic]:
        DomainWorkOrderPromotionRule.Automatic,
      [WorkOrderPromotionRule.Manual]: DomainWorkOrderPromotionRule.Manual
    }[workOrderPromotionRule] || DomainWorkOrderPromotionRule.Manual
  )
}
const mapSiteSettingFormVM = (site: SiteDetailConfig): SiteSettingFormValue => {
  const {
    sparePartsShop,
    vidi,
    contract,
    processInsights,
    divertHealth,
    shuttleHealth,
    cases
  } = site
  const {
    monitronWorkOrderPromotionRule,
    shuttleHealthWorkOrderPromotionRule,
    divertHealthWorkOrderPromotionRule,
    vidiWorkOrderPromotionRule
  } = cases || {}

  return {
    [SiteSetting.SpareParts]: sparePartsShop?.enabled || false,
    [SiteSetting.Vidi]: vidi?.enabled || false,
    [SiteSetting.MyContracts]: contract.enabled,
    [SiteSetting.ProcessInsights]: processInsights?.enabled || false,
    [SiteSetting.DivertHealth]: divertHealth.enabled || false,
    [SiteSetting.ShuttleHealth]: shuttleHealth?.enabled || false,
    [SiteSetting.DivertHealthUrl]: divertHealth?.url || '',
    [SiteSetting.ShuttleHealthUrl]: shuttleHealth?.url || '',
    [SiteSetting.Cases]: cases.enabled,
    [SiteSetting.CasesWorkOrderPromotionalRules]: {
      [EventSources.Monitron]: mapWorkOrderPromotionRule(
        monitronWorkOrderPromotionRule
      ),
      [EventSources.ShuttleHealth]: mapWorkOrderPromotionRule(
        shuttleHealthWorkOrderPromotionRule
      ),
      [EventSources.DivertHealth]: mapWorkOrderPromotionRule(
        divertHealthWorkOrderPromotionRule
      ),
      [EventSources.OperationalAwareness]: mapWorkOrderPromotionRule(
        vidiWorkOrderPromotionRule
      )
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SiteSettingsGeneralService {
  private translocoService = inject(TranslocoService)
  private toastService = inject(ToasterService)
  private store = inject(Store)
  private selectSiteSettingConfig$ = this.store.select(
    siteDetailFeature.selectSiteSettingConfig
  )

  public siteId$ = this.store
    .select(siteDetailFeature.selectSiteId)
    .pipe(filterNull())

  public getSiteSettingGeneralVM$ = (): Observable<SiteSettingGeneralVM> => {
    return this.selectSiteSettingConfig$.pipe(
      filter((site): site is SiteDetailConfig => !!site),
      map(
        (site: SiteDetailConfig): SiteSettingGeneralVM => ({
          siteSettingFormValue: mapSiteSettingFormVM(site)
        })
      )
    )
  }

  public updateSiteConfigs(value: SiteSettingFormValue) {
    combineLatest([this.siteId$, of(value)])
      .pipe(
        map(([siteId, formValue]) => mapFormValueToPayload(siteId, formValue)),
        take(1)
      )
      .subscribe({
        next: (payload) =>
          this.store.dispatch(siteDetailActions.updateSiteConfigs({ payload }))
      })
    // @TODO: Move this to a store effect
    this.store
      .select(siteDetailFeature.selectLoading)
      .pipe(
        filter(Boolean),
        switchMap(() => this.store.select(siteDetailFeature.selectError)),
        take(1)
      )
      .subscribe((error) =>
        error ? this.showErrorToast() : this.showSuccessToast()
      )
  }

  public showErrorToast(): void {
    const message = this.translocoService.translate('General.ApiError')
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }

  public showSuccessToast(): void {
    const message = this.translocoService.translate(
      'SiteAdminGeneralSettings.SettingsSaveSuccessMsg'
    )
    const success = new Toast('success', message)
    this.toastService.addToast(success)
  }
}
