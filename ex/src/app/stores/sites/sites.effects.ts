import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { portalsFeature } from '@stores/portals/portals.state'
import { mapSegment } from '@stores/site-details/utils/site-mapping'
import { catchError, distinctUntilChanged, map, of, switchMap } from 'rxjs'
import {
  UserSitesByPortalIdGQL,
  UserSitesByPortalIdQuery
} from './graphql/user-sites-by-portal-id.graphql-gen'
import { Site } from './interfaces/sites.interface'
import {
  default as SitesActions,
  default as sitesActions
} from './sites.actions'

const mapUserSites = (userSitesByPortalId: UserSitesByPortalIdQuery): Site[] =>
  userSitesByPortalId.me.relatedPortalData?.AccessibleSites.map((site) => ({
    contractVisible: site.contractVisible,
    id: site.id,
    name: site.name,
    segments: site.projects.map((project) => mapSegment(project.segment)),
    published: site.published,
    sourceId: site.sourceId
  })) || []

export const selectedPortalChanged$ = createEffect(
  (store = inject(Store)) =>
    store.select(portalsFeature.selectCurrentPortalId).pipe(
      distinctUntilChanged(),
      map((portalId) =>
        portalId
          ? sitesActions.getSitesByPortalId({ portalId })
          : sitesActions.resetSites()
      )
    ),
  { functional: true }
)

export const getSitesByPortalId$ = createEffect(
  (
    action$ = inject(Actions),
    userSitesByPortalIdGQL = inject(UserSitesByPortalIdGQL)
  ) =>
    action$.pipe(
      ofType(SitesActions.getSitesByPortalId),
      switchMap(({ portalId }) =>
        userSitesByPortalIdGQL.fetch({ portalId }).pipe(
          map((response) =>
            SitesActions.getSitesByPortalIdSuccess({
              sites: mapUserSites(response.data)
            })
          ),
          catchError((error: Error) =>
            of(SitesActions.getSitesByPortalIdFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)
