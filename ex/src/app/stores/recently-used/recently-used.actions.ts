import { createActionGroup, props } from '@ngrx/store'

export default createActionGroup({
  source: 'Recently-used',
  events: {
    setRecentlyUsedPortal: props<{ portalId: string }>(),
    setRecentlyUsedSite: props<{ siteId: string }>()
  }
})
