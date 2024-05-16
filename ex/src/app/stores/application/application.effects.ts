import { inject } from '@angular/core'
import { environment } from '@environments/environment'
import { createEffect } from '@ngrx/effects'
import { getRouterSelectors } from '@ngrx/router-store'
import { Store } from '@ngrx/store'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { maximoFeature } from '@stores/maximo/maximo.state'
import { filterNull } from '@stores/operators'
import {
  SiteDetails,
  SiteSegment
} from '@stores/site-details/interfaces/site-detail.interface'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import { combineLatest, map, of } from 'rxjs'
import applicationActions from './application.actions'
import { Applications } from './interfaces/application.interface'

const vidiEnabledAndSegmentMatches = (
  siteDetails: SiteDetails | null,
  siteSegments: SiteSegment[]
): boolean =>
  (siteDetails?.configs.vidi.enabled &&
    siteDetails.projects.some((project) =>
      siteSegments.includes(project.segment)
    )) ||
  false
//
const isApplication = (module: unknown): module is Applications =>
  Object.values(Applications).includes(module as Applications)

export const routerNavigation = createEffect(
  (store = inject(Store)) =>
    store.select(getRouterSelectors().selectRouteData).pipe(
      map((data) => {
        const module = data?.module
        if (isApplication(module)) {
          return applicationActions.updateCurrentApplication({
            application: module
          })
        }
        return applicationActions.resetCurrentApplication()
      })
    ),
  { functional: true }
)

/* Cases are enabled if the site has cases enabled and the user type is employee
 */
export const getCases$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(siteDetailFeature.selectSiteNotLoading),
      store.select(currentUserFeature.isEmployee)
    ]).pipe(
      map(([siteDetails, isEmployee]) =>
        applicationActions.updateApplications({
          [Applications.Cases]: {
            enabled: (siteDetails?.configs.cases.enabled && isEmployee) || false
          }
        })
      )
    ),
  { functional: true }
)

/* Contacts are always enabled */
export const getContacts = createEffect(
  () =>
    of(
      applicationActions.updateApplications({
        [Applications.Contacts]: {
          enabled: true
        }
      })
    ),
  { functional: true }
)

/* Contracts are enabled if the site has contracts enabled and the user has read
 *  access on Maximo
 */
export const getContracts$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(siteDetailFeature.selectSiteNotLoading),
      store.select(maximoFeature.hasReadAccessNotLoading)
    ]).pipe(
      filterNull(),
      map(([siteDetails, hasReadAccess]) =>
        applicationActions.updateApplications({
          [Applications.Contracts]: {
            enabled:
              (siteDetails?.configs.contract.enabled && hasReadAccess) || false
          }
        })
      )
    ),
  { functional: true }
)

/* DivertHealth is enabled if the site has divert health enabled and the user
 * type is employee
 */
export const getDivertHealth$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(siteDetailFeature.selectSiteNotLoading).pipe(filterNull()),
      store.select(currentUserFeature.isEmployee)
    ]).pipe(
      map(([siteDetails, isEmployee]) =>
        applicationActions.updateApplications({
          [Applications.DivertHealth]: {
            enabled: siteDetails?.configs.divertHealth.enabled && isEmployee,
            external: true,
            url: siteDetails.configs.divertHealth.url
          }
        })
      )
    ),
  { functional: true }
)

/* Documentation is always enabled */
export const getDocumentation = createEffect(
  () =>
    of(
      applicationActions.updateApplications({
        [Applications.Documentation]: {
          enabled: true
        }
      })
    ),
  { functional: true }
)

/* Home is always enabled */
export const getHome = createEffect(
  () =>
    of(
      applicationActions.updateApplications({
        [Applications.Home]: {
          enabled: true
        }
      })
    ),
  { functional: true }
)

/* PaceInsights is enabled if the site has pace insights enabled and the site
 * segment is parcel
 */
export const getPaceInsights$ = createEffect(
  (store = inject(Store)) =>
    store.select(siteDetailFeature.selectSiteNotLoading).pipe(
      filterNull(),
      map((siteDetails) =>
        applicationActions.updateApplications({
          [Applications.PaceInsights]: {
            enabled: vidiEnabledAndSegmentMatches(siteDetails, [
              SiteSegment.Parcel
            ]),
            external: true,
            url: environment.vidiUrl
          }
        })
      )
    ),
  { functional: true }
)
/* ProcessInsights is enabled if the site has process insights enabled and the
 * user type is employee
 */
export const getProcessInsights$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(siteDetailFeature.selectSiteNotLoading).pipe(filterNull()),
      store.select(currentUserFeature.isEmployee)
    ]).pipe(
      map(([siteDetails, isEmployee]) =>
        applicationActions.updateApplications({
          [Applications.ProcessInsights]: {
            enabled: siteDetails.configs.processInsights.enabled && isEmployee
          }
        })
      )
    ),
  { functional: true }
)
/* Settings are enabled if the user is a super user or portal admin */
export const getSettings$ = createEffect(
  (store = inject(Store)) =>
    store.select(currentUserFeature.isSuperUserOrPortalAdmin).pipe(
      map((isSuperUserOrPortalAdmin) =>
        applicationActions.updateApplications({
          [Applications.Settings]: {
            enabled: isSuperUserOrPortalAdmin
          }
        })
      )
    ),
  { functional: true }
)

/* ShuttleHealth is enabled if the site has shuttle health enabled and the user
 * type is employee
 */
export const getShuttleHealth$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(siteDetailFeature.selectSiteNotLoading).pipe(filterNull()),
      store.select(currentUserFeature.isEmployee)
    ]).pipe(
      map(([siteDetails, isEmployee]) =>
        applicationActions.updateApplications({
          [Applications.ShuttleHealth]: {
            enabled: siteDetails?.configs.shuttleHealth.enabled && isEmployee,
            external: true,
            url: siteDetails.configs.shuttleHealth.url
          }
        })
      )
    ),
  { functional: true }
)

/* SpareParts is enabled if the site has spare parts enabled */
export const getSpareParts$ = createEffect(
  (store = inject(Store)) =>
    store.select(siteDetailFeature.selectSiteNotLoading).pipe(
      filterNull(),
      map((siteDetails) =>
        applicationActions.updateApplications({
          [Applications.SpareParts]: {
            enabled: siteDetails.configs.sparePartsShop.enabled,
            external: true,
            url: environment.sparePartsUrl
          }
        })
      )
    ),
  { functional: true }
)

/* System map is always disabled */
export const getSystem = createEffect(
  () =>
    of(
      applicationActions.updateApplications({
        [Applications.System]: {
          enabled: false
        }
      })
    ),
  { functional: true }
)

/* Tickets are enabled if the user has read access on Maximo */
export const getTickets$ = createEffect(
  (store = inject(Store)) =>
    store.select(maximoFeature.hasReadAccessNotLoading).pipe(
      filterNull(),
      map((hasReadAccess) =>
        applicationActions.updateApplications({
          [Applications.Tickets]: {
            enabled: !!hasReadAccess
          }
        })
      )
    ),
  { functional: true }
)

/* Training is always enabled */
export const getTraining = createEffect(
  () =>
    of(
      applicationActions.updateApplications({
        [Applications.Training]: {
          enabled: true
        }
      })
    ),
  { functional: true }
)

/* VIAInsights is enabled if the site has VIA insights enabled and the site
 * segment is airports
 */
export const getVIAInsights$ = createEffect(
  (store = inject(Store)) =>
    store.select(siteDetailFeature.selectSiteNotLoading).pipe(
      filterNull(),
      map((siteDetails) =>
        applicationActions.updateApplications({
          [Applications.VIAInsights]: {
            enabled: vidiEnabledAndSegmentMatches(siteDetails, [
              SiteSegment.Airports
            ]),
            external: true,
            url: environment.vidiUrl
          }
        })
      )
    ),
  { functional: true }
)

/* VIDI is enabled if the site has VIDI enabled and the site segment is not
 * applicable
 */
export const getVIDI$ = createEffect(
  (store = inject(Store)) =>
    store
      .select(siteDetailFeature.selectSiteNotLoading)
      .pipe(filterNull())
      .pipe(
        map((siteDetails) =>
          applicationActions.updateApplications({
            [Applications.VIDI]: {
              enabled:
                siteDetails.configs.vidi.enabled &&
                siteDetails.projects.every(
                  (project) => project.segment === SiteSegment.NotApplicable
                ),
              external: true,
              url: environment.vidiUrl
            }
          })
        )
      ),
  { functional: true }
)

/* WSInsights is enabled if the site has WS insights enabled and the site
 * segments are warehouse or amazon
 */
export const getWSInsights$ = createEffect(
  (store = inject(Store)) =>
    store.select(siteDetailFeature.selectSiteNotLoading).pipe(
      filterNull(),
      map((siteDetails) =>
        applicationActions.updateApplications({
          [Applications.WSInsights]: {
            enabled: vidiEnabledAndSegmentMatches(siteDetails, [
              SiteSegment.Amazon,
              SiteSegment.Warehousing
            ]),
            external: true,
            url: environment.vidiUrl
          }
        })
      )
    ),
  { functional: true }
)

/* WarrantyClaims is enabled if the user is a super user and has read access on
 * Maximo
 */
export const getWarrantyClaims$ = createEffect(
  (store = inject(Store)) =>
    combineLatest([
      store.select(currentUserFeature.isSuperUser),
      store.select(maximoFeature.hasReadAccessNotLoading)
    ]).pipe(
      map(([isSuperUser, hasReadAccess]) =>
        applicationActions.updateApplications({
          [Applications.WarrantyClaims]: {
            enabled: isSuperUser && hasReadAccess
          }
        })
      )
    ),
  { functional: true }
)

/* SiteOverview is enabled if the user is a super user */
export const getSiteOverview$ = createEffect(
  (store = inject(Store)) =>
    store.select(currentUserFeature.isSuperUser).pipe(
      map((isSuperUser) =>
        applicationActions.updateApplications({
          [Applications.SiteOverview]: {
            enabled: isSuperUser
          }
        })
      )
    ),
  { functional: true }
)
