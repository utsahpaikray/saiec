import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Site } from './interfaces/sites.interface'

export default createActionGroup({
  source: 'Sites',
  events: {
    getSitesByPortalId: props<{ portalId: string }>(),
    getSitesByPortalIdSuccess: props<{ sites: Site[] }>(),
    getSitesByPortalIdFailure: props<{ error: Error }>(),
    resetSites: emptyProps()
  }
})
