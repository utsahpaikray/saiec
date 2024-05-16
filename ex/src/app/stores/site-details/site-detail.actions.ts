import { createActionGroup, emptyProps, props } from '@ngrx/store'
import {
  SiteConfigPayload,
  SiteDetails
} from './interfaces/site-detail.interface'

export default createActionGroup({
  source: 'Site-detail',
  events: {
    getSiteDetails: props<{ siteId: string }>(),
    getSiteDetailsSuccess: props<{ site: SiteDetails }>(),
    getSiteDetailsFailure: props<{ error: Error }>(),
    reset: emptyProps(),
    updateSiteConfigs: props<{
      payload: SiteConfigPayload
    }>(),
    updateSiteConfigSuccess: props<{ siteId: string }>(),
    updateSiteConfigFailure: props<{ error: Error }>()
  }
})
