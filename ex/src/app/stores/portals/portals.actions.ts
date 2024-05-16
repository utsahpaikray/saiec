import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Portal } from './interfaces/portal.interface'

export default createActionGroup({
  source: 'Portals',
  events: {
    getMyPortals: emptyProps(),
    getMyPortalsSuccess: props<{ portals: Portal[] }>(),
    getMyPortalsFailure: props<{ error: Error }>(),
    getCurrentPortal: props<{ portalId: string }>(),
    getCurrentPortalSuccess: props<{ portal: Portal }>(),
    getCurrentPortalFailure: props<{ error: Error }>(),
    resetCurrentPortal: emptyProps(),
    fetchCurrentPortal: props<{ portalId: string }>(),
    fetchCurrentPortalSuccess: props<{ portal: Portal }>(),
    fetchCurrentPortalFailure: props<{ error: Error }>(),
    getCurrentPortalBySiteId: props<{ siteId: string }>(),
    getCurrentPortalBySiteIdSuccess: props<{ portal: Portal }>(),
    getCurrentPortalBySiteIdFailure: props<{ error: Error }>(),
    fetchCurrentPortalBySiteId: props<{ siteId: string }>(),
    getUserPortals: props<{ userId: string }>(),
    getUserPortalsSuccess: props<{ portals: Portal[] }>(),
    getUserPortalsFailure: props<{ error: Error }>()
  }
})
