import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { getRouterSelectors } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { UpdateSiteConfigsGQL } from './graphql/set-site-settings.graphql-gen'
import { UserSiteDetailsGQL } from './graphql/user-site-by-id.graphql-gen'
import siteDetailActions from './site-detail.actions'
import { siteDetailFeature } from './site-detail.state'
import {
  mapUpdateSiteConfigsMutation,
  mapUserSiteDetails
} from './utils/site-mapping'

export const routerNavigationHasSiteId$ = createEffect(
  (store = inject(Store)) =>
    store.select(getRouterSelectors().selectRouteParams).pipe(
      withLatestFrom(store.select(siteDetailFeature.selectSiteId)),
      filter(([params, siteId]) => params?.siteId !== siteId),
      map(([params]) =>
        params?.siteId
          ? siteDetailActions.getSiteDetails({ siteId: params.siteId })
          : siteDetailActions.reset()
      )
    ),
  { functional: true }
)

export const getSiteDetails$ = createEffect(
  (
    actions$ = inject(Actions),
    userSiteDetailsGQL = inject(UserSiteDetailsGQL)
  ) =>
    actions$.pipe(
      ofType(siteDetailActions.getSiteDetails),
      switchMap(({ siteId }) =>
        userSiteDetailsGQL.fetch({ siteId }, { fetchPolicy: 'no-cache' }).pipe(
          map((response) =>
            siteDetailActions.getSiteDetailsSuccess({
              site: mapUserSiteDetails(response.data)
            })
          ),
          catchError((error) =>
            of(siteDetailActions.getSiteDetailsFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)

export const updateSiteConfigs$ = createEffect(
  (
    actions$ = inject(Actions),
    updateSiteConfigsGQL = inject(UpdateSiteConfigsGQL)
  ) =>
    actions$.pipe(
      ofType(siteDetailActions.updateSiteConfigs),
      switchMap(({ payload }) =>
        updateSiteConfigsGQL.mutate(mapUpdateSiteConfigsMutation(payload)).pipe(
          map(() =>
            siteDetailActions.updateSiteConfigSuccess({
              siteId: payload.siteId
            })
          ),
          catchError((error) =>
            of(siteDetailActions.updateSiteConfigFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)

// If currently loaded siteId is the same, fetch site config again
export const updateSiteDetailsOnConfigChange$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(siteDetailActions.updateSiteConfigSuccess),
      withLatestFrom(store.select(siteDetailFeature.selectSite)),
      filter(([{ siteId }, currentSite]) => siteId === currentSite?.id),
      map(([{ siteId }]) => siteDetailActions.getSiteDetails({ siteId }))
    ),
  { functional: true }
)
