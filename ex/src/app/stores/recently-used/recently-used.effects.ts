import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import portalsActions from '@stores/portals/portals.actions'
import { map } from 'rxjs'
import recentlyUsedActions from './recently-used.actions'
import siteDetailActions from '@stores/site-details/site-detail.actions'

export const currentPortalUpdated$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(portalsActions.getCurrentPortalSuccess),
      map(({ portal }) =>
        recentlyUsedActions.setRecentlyUsedPortal({ portalId: portal.id })
      )
    ),
  { functional: true }
)

export const currentSiteUpdated$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(siteDetailActions.getSiteDetailsSuccess),
      map(({ site }) =>
        recentlyUsedActions.setRecentlyUsedSite({ siteId: site.id })
      )
    ),
  { functional: true }
)
