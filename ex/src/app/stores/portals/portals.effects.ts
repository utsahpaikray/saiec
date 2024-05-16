import { inject } from '@angular/core'
import { PortalRelatedToSiteGQL } from '@core/portals/graphql/portal-related-to-site.query.graphql-gen'
import {
  AccessiblePortalsGQL,
  AllocatedPortalsGQL,
  PortalByPortalIdGQL
} from '@core/portals/graphql/portals.query.graphql-gen'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { getRouterSelectors } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import {
  catchError,
  combineLatest,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom
} from 'rxjs'
import { Portal } from './interfaces/portal.interface'
import {
  default as PortalsActions,
  default as portalsActions
} from './portals.actions'
import { mapPortals, portalsFeature } from './portals.state'

export const routerNavigationHasPortalId$ = createEffect(
  (store = inject(Store)) =>
    store.select(getRouterSelectors().selectRouteParams).pipe(
      withLatestFrom(store.select(portalsFeature.selectCurrentPortalId)),
      filter(([params, portalId]) => params?.portalId !== portalId),
      map(([params]) =>
        params?.portalId
          ? portalsActions.getCurrentPortal({ portalId: params.portalId })
          : portalsActions.resetCurrentPortal()
      )
    ),
  { functional: true }
)

// Portals have to be loaded on application startup
export const loadAllPortals$ = createEffect(
  (store = inject(Store)) =>
    store.select(currentUserFeature.isAuthenticated).pipe(
      filter(Boolean),
      map(() => portalsActions.getMyPortals())
    ),
  { functional: true }
)

export const getPortals$ = createEffect(
  (
    actions$ = inject(Actions),
    accessiblePortalsGQL = inject(AccessiblePortalsGQL)
  ) =>
    actions$.pipe(
      ofType(portalsActions.getMyPortals),
      switchMap(() => {
        return accessiblePortalsGQL
          .fetch()
          .pipe(
            map(
              (portals) => portals.data.me.relatedPortalData?.AccessiblePortals
            )
          )
      }),
      map(mapPortals),
      map((portals) =>
        portals
          ? PortalsActions.getMyPortalsSuccess({
              portals
            })
          : PortalsActions.getMyPortalsFailure({
              error: new Error('No portals found in response')
            })
      ),
      catchError((error) =>
        of(PortalsActions.getMyPortalsFailure({ error: error }))
      )
    ),
  { functional: true }
)

export const getCurrentPortalByPortalId$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(PortalsActions.getCurrentPortal),
      map((portalAction) => portalAction.portalId),
      filter((portalId): portalId is string => !!portalId),
      switchMap((portalId) =>
        combineLatest([
          of(portalId),
          store.select(portalsFeature.selectPortalsLoaded)
        ])
      ),
      filter(([, portalLoaded]) => portalLoaded),
      withLatestFrom(store.select(portalsFeature.selectMyPortals)),
      switchMap(([[currentPortalId], myPortals]) => {
        const currentPortal = myPortals.portals.find(
          (portal) => portal.id === currentPortalId
        )
        if (currentPortal) {
          return of(currentPortal) // return existing portal from myPortal state
        }
        return of(currentPortalId)
      }),
      switchMap((currentPortalsOrID) => {
        if (typeof currentPortalsOrID === 'string') {
          return of(currentPortalsOrID).pipe(
            map((portalId) =>
              PortalsActions.fetchCurrentPortal({
                portalId
              })
            )
          )
        }
        return of(currentPortalsOrID).pipe(
          map((portal) =>
            PortalsActions.getCurrentPortalSuccess({
              portal
            })
          ),
          catchError((error) =>
            of(PortalsActions.getCurrentPortalFailure({ error: error }))
          )
        )
      })
    ),
  { functional: true }
)

export const fetchCurrentPortalsByPortalId$ = createEffect(
  (
    action$ = inject(Actions),
    portalByPortalIdGQL = inject(PortalByPortalIdGQL)
  ) =>
    action$.pipe(
      ofType(portalsActions.fetchCurrentPortal),
      map((portalAction) => portalAction.portalId),
      filter((portalId): portalId is string => !!portalId),
      switchMap((portalId) => {
        return portalByPortalIdGQL
          .fetch({
            id: portalId
          })
          .pipe(
            map(
              (portal) => portal.data.me.relatedPortalData?.AccessiblePortals
            ),
            filter((portals): portals is Portal[] => !!portals),
            map((portal) => ({ id: portal[0].id, name: portal[0].name })),
            map((portal) =>
              PortalsActions.fetchCurrentPortalSuccess({
                portal
              })
            ),
            catchError((error) =>
              of(PortalsActions.fetchCurrentPortalFailure({ error: error }))
            )
          )
      })
    ),
  { functional: true }
)

export const getPortalBySiteId$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(PortalsActions.getCurrentPortalBySiteId),
      map((portalAction) => portalAction.siteId),
      filter((siteId): siteId is string => !!siteId),
      switchMap((siteId) =>
        combineLatest([
          of(siteId),
          store.select(portalsFeature.selectPortalsLoaded)
        ])
      ),
      filter(([, portalLoaded]) => portalLoaded),
      withLatestFrom(
        store.select(portalsFeature.selectMyPortals),
        store.select(portalsFeature.selectCurrentPortal)
      ),
      switchMap(([[currentPortalId], myPortals, currentPortal]) => {
        const fetchCurrentPortal = myPortals.portals.find(
          (portal) => portal.id === currentPortal?.id
        )
        if (fetchCurrentPortal) {
          return of(fetchCurrentPortal) // return existing portal from myPortal state
        }
        return of(currentPortalId)
      }),
      switchMap((currentPortalsOrSiteID) => {
        if (typeof currentPortalsOrSiteID === 'string') {
          return of(currentPortalsOrSiteID).pipe(
            map((siteId) =>
              PortalsActions.fetchCurrentPortalBySiteId({
                siteId
              })
            )
          )
        }

        return of(currentPortalsOrSiteID).pipe(
          map((portal) =>
            PortalsActions.getCurrentPortalBySiteIdSuccess({
              portal
            })
          ),
          catchError((error) =>
            of(PortalsActions.getCurrentPortalBySiteIdFailure({ error: error }))
          )
        )
      })
    ),
  { functional: true }
)

export const fetchPortalBySiteId$ = createEffect(
  (
    action$ = inject(Actions),
    portalRelatedToSiteGQL = inject(PortalRelatedToSiteGQL)
  ) =>
    action$.pipe(
      ofType(PortalsActions.fetchCurrentPortalBySiteId),
      switchMap((site) =>
        portalRelatedToSiteGQL.fetch({ siteId: site.siteId })
      ),
      map((portal) => portal.data.me.relatedPortalData?.AccessiblePortals),
      map(mapPortals),
      switchMap((portals) =>
        of(
          portals
            ? PortalsActions.getCurrentPortalBySiteIdSuccess({
                portal: portals[0]
              })
            : PortalsActions.getCurrentPortalBySiteIdFailure({
                error: new Error('no portals found in response')
              })
        )
      ),
      catchError((error) =>
        of(PortalsActions.getCurrentPortalBySiteIdFailure({ error: error }))
      )
    ),
  { functional: true }
)

//TODO to be continued/update in user allocated portals
export const getUserPortals$ = createEffect(
  (
    actions$ = inject(Actions),
    allocatedPortalsGQL = inject(AllocatedPortalsGQL),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(PortalsActions.getUserPortals),
      concatLatestFrom(() =>
        store.select(currentUserFeature.selectIsAuthenticated)
      ),
      switchMap(([, isAuthenticated]) => {
        if (isAuthenticated) {
          return store.select(currentUserFeature.isSuperUserOrPortalAdmin)
        }
        throw new Error('User is not authenticated')
      }),
      filter((isSuperUserOrPortalAdmin) => !!isSuperUserOrPortalAdmin),
      switchMap((isSuperUserOrPortalAdmin) => {
        if (isSuperUserOrPortalAdmin) {
          return allocatedPortalsGQL
            .fetch()
            .pipe(
              map(
                (currentUser) =>
                  currentUser.data.user?.relatedPortalData?.AllocatedPortals
              )
            )
        }
        return of([])
      }),
      map(mapPortals),
      switchMap((portals) =>
        of(
          portals
            ? PortalsActions.getUserPortalsSuccess({
                portals
              })
            : PortalsActions.getUserPortalsFailure({
                error: new Error('No portals found in response')
              })
        )
      ),
      catchError((error) =>
        of(PortalsActions.getUserPortalsFailure({ error: error }))
      )
    ),
  { functional: true }
)
