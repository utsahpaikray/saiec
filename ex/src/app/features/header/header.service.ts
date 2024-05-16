import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { PortalRouteSegments } from '@pages/portal/portal-route-segments.enum'
import { applicationFeature } from '@stores/application/application.state'
import { Applications } from '@stores/application/interfaces/application.interface'
import { AppState } from '@stores/application/interfaces/state.interface'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { filterNull, notNullOrUndefined } from '@stores/operators'
import { Portal } from '@stores/portals/interfaces/portal.interface'
import { portalsFeature } from '@stores/portals/portals.state'
import { recentlyUsedFeature } from '@stores/recently-used/recently-used.state'
import { SiteDetails } from '@stores/site-details/interfaces/site-detail.interface'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import { Site } from '@stores/sites/interfaces/sites.interface'
import { sitesFeature } from '@stores/sites/sites.state'
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs'
import { AppRouteSegments } from 'src/app/app-route-segments.enum'
import {
  HeaderItemType,
  HeaderMenuId,
  HeaderMenuItem,
  HeaderMenuLinkInternal,
  HeaderMenuOptions,
  HeaderMenuStatic,
  HeaderVM
} from './header.vm'

const applicationToLabel: Record<Applications, string> = {
  [Applications.Cases]: 'GlobalHeader.Applications.Cases',
  [Applications.ProcessInsights]: 'GlobalHeader.Applications.ProcessInsights',
  [Applications.Tickets]: 'GlobalHeader.Applications.Tickets',
  [Applications.Contacts]: 'GlobalHeader.Applications.Contacts',
  [Applications.Settings]: 'GlobalHeader.Applications.Settings',
  [Applications.Training]: 'GlobalHeader.Applications.Training',
  [Applications.Contracts]: 'GlobalHeader.Applications.Contracts',
  [Applications.Documentation]: 'GlobalHeader.Applications.Documentation',
  [Applications.SpareParts]: 'GlobalHeader.Applications.SpareParts',
  [Applications.VIDI]: 'GlobalHeader.Applications.VIDI',
  [Applications.DivertHealth]: 'GlobalHeader.Applications.DivertHealth',
  [Applications.ShuttleHealth]: 'GlobalHeader.Applications.ShuttleHealth',
  [Applications.PaceInsights]: 'GlobalHeader.Applications.PaceInsights',
  [Applications.VIAInsights]: 'GlobalHeader.Applications.VIAInsights',
  [Applications.WSInsights]: 'GlobalHeader.Applications.WSInsights',
  [Applications.WarrantyClaims]: 'GlobalHeader.Applications.WarrantyClaims',
  [Applications.System]: 'GlobalHeader.Applications.System',
  [Applications.Home]: 'GlobalHeader.Applications.Home',
  [Applications.SiteOverview]: 'GlobalHeader.Applications.SiteOverview'
}

const mapApplicationMenu = (
  currentPortal: Portal | null,
  currentSite: SiteDetails | null,
  currentApplication: Applications | null,
  applications: Partial<Record<Applications, AppState>>
): HeaderMenuItem | null => {
  if (!currentPortal || !currentSite) {
    return null
  }
  return {
    id: HeaderMenuId.Applications,
    type: HeaderItemType.Menu,
    label: currentApplication
      ? applicationToLabel[currentApplication]
      : 'GlobalHeader.SelectApplication',
    name: currentApplication ?? '',
    icon: 'arrow-right',
    selected: !!currentApplication,
    items: Object.entries(applications)
      .filter((entry): entry is [Applications, AppState] => true) // this filter is need because we cannot cast the application into Applications
      .reduce<HeaderMenuOptions>((acc, [application, appState]) => {
        if (appState.external && appState.url) {
          return [
            ...acc,
            {
              id: HeaderMenuId.Applications,
              type: HeaderItemType.External,
              label: applicationToLabel[application],
              name: application,
              href: appState.url,
              target: '_blank',
              icon: 'open-in-new'
            }
          ]
        }

        if (!appState.external) {
          return [
            ...acc,
            {
              id: HeaderMenuId.Applications,
              type: HeaderItemType.Internal,
              label: applicationToLabel[application],
              name: application,
              routerLink: [
                '/',
                AppRouteSegments.Portals,
                currentPortal.id,
                PortalRouteSegments.Sites,
                currentSite.id,
                application
              ],
              selected: application === currentApplication
            }
          ]
        }
        return acc
      }, [])
  }
}

const mapSiteMenu = (
  currentPortal: Portal | null,
  currentSite: SiteDetails | null,
  sites: Site[],
  totalSites: number,
  isPrivilidged = false
): HeaderMenuItem | HeaderMenuLinkInternal | HeaderMenuStatic | null => {
  if (!currentPortal) {
    return null
  }
  if (totalSites < 1) {
    return {
      id: HeaderMenuId.Sites,
      type: HeaderItemType.Static,
      label: 'GlobalHeader.NoSites',
      icon: 'error'
    }
  }
  if (!isPrivilidged && totalSites === 1) {
    return {
      id: HeaderMenuId.Sites,
      type: HeaderItemType.Static,
      label: 'GlobalHeader.Site',
      name: sites[0].name,
      icon: 'arrow-right'
    }
  }
  return {
    id: HeaderMenuId.Sites,
    type: HeaderItemType.Menu,
    searchable: true,
    label: currentSite ? 'GlobalHeader.Site' : 'GlobalHeader.SelectSites',
    name: currentSite?.name ?? '',
    icon: 'arrow-right',
    selected: !!currentSite,
    total: totalSites,
    showing: sites.length,
    items: sites.map((site) => ({
      id: site.id,
      type: HeaderItemType.Internal,
      label: 'GlobalHeader.Site',
      name: site.name,
      routerLink: [
        '/',
        AppRouteSegments.Portals,
        currentPortal.id,
        PortalRouteSegments.Sites,
        site.id
      ],
      selected: site.id === currentSite?.id
    }))
  }
}

const mapPortalMenu = (
  currentPortal: Portal | null,
  portals: Portal[],
  totalPortals: number,
  isPrivilidged = false
): HeaderMenuItem | HeaderMenuLinkInternal | HeaderMenuStatic | null => {
  if (totalPortals < 1) {
    return {
      id: HeaderMenuId.Portals,
      type: HeaderItemType.Static,
      label: 'GlobalHeader.NoPortals',
      icon: 'error'
    }
  }
  if (!isPrivilidged && totalPortals === 1) {
    return {
      id: HeaderMenuId.Portals,
      type: HeaderItemType.Static,
      label: 'GlobalHeader.Portal',
      name: portals[0].name,
      icon: 'arrow-right'
    }
  }
  return {
    id: HeaderMenuId.Portals,
    searchable: true,
    type: HeaderItemType.Menu,
    label: currentPortal ? 'GlobalHeader.Portal' : 'GlobalHeader.SelectPortals',
    name: currentPortal?.name ?? '',
    icon: 'arrow-right',
    selected: !!currentPortal,
    total: totalPortals,
    showing: portals.length,
    items: portals.map((portal) => ({
      id: portal.id,
      type: HeaderItemType.Internal,
      label: 'GlobalHeader.Portal',
      name: portal.name,
      routerLink: ['/', AppRouteSegments.Portals, portal.id],
      selected: portal.id === currentPortal?.id
    }))
  }
}

const queryByName =
  <T extends { name: string }>(query: string) =>
  (item: T) =>
    item.name.toLowerCase().includes(query.toLowerCase())

const MAX_ITEMS = 10
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private store = inject(Store)

  private currentUser$ = this.store
    .select(currentUserFeature.selectCurrentUser)
    .pipe(filterNull())
  private isSuperUserOrPortalAdmin$ = this.store.select(
    currentUserFeature.isSuperUserOrPortalAdmin
  )
  private myPortals$ = this.store
    .select(portalsFeature.selectMyPortalsNotLoading)
    .pipe(filterNull())
  private mySites$ = this.store.select(sitesFeature.selectSitesNotLoading)
  private myApplications$ = this.store.select(
    applicationFeature.selectAvailableApplications
  )

  public currentPortal$ = this.store.select(portalsFeature.selectCurrentPortal)
  public currentSite$ = this.store.select(siteDetailFeature.selectSite)
  public currentApplication$ = this.store.select(
    applicationFeature.selectCurrentApplication
  )

  private portalQuery$ = new Subject<string>()
  private filteredPortals$ = combineLatest([
    this.myPortals$,
    this.portalQuery$.pipe(startWith('')),
    this.store.select(recentlyUsedFeature.selectRecentlyUsedPortalIds)
  ]).pipe(
    map(([portals, query, recentlyUsed]) => {
      const filteredPortals = portals
        .filter(queryByName(query))
        .sort((a, b) => {
          const aIndex = recentlyUsed.indexOf(a.id)
          const bIndex = recentlyUsed.indexOf(b.id)
          if (aIndex === -1 || bIndex === -1) {
            return bIndex - aIndex
          }
          return aIndex - bIndex
        })
        .slice(0, MAX_ITEMS)
      return {
        filteredPortals,
        total: portals.length,
        showing: filteredPortals.length
      }
    })
  )

  private siteQuery$ = new Subject<string>()
  private filteredSites$ = combineLatest([
    this.mySites$,
    this.siteQuery$.pipe(startWith('')),
    this.store.select(recentlyUsedFeature.selectRecentlyUsedSiteIds)
  ]).pipe(
    map(([sites, query, recentlyUsed]) => {
      const filteredSites = (sites || [])
        .filter(queryByName(query))
        .sort((a, b) => {
          const aIndex = recentlyUsed.indexOf(a.id)
          const bIndex = recentlyUsed.indexOf(b.id)
          if (aIndex === -1 || bIndex === -1) {
            return bIndex - aIndex
          }
          return aIndex - bIndex
        })
        .slice(0, MAX_ITEMS)
      return {
        filteredSites,
        total: sites?.length ?? 0,
        showing: filteredSites.length
      }
    })
  )

  public getVM$(): Observable<HeaderVM> {
    return combineLatest({
      currentUser: this.currentUser$,
      currentPortal: this.currentPortal$,
      currentSite: this.currentSite$,
      currentApplication: this.currentApplication$,
      isSuperUserOrPortalAdmin: this.isSuperUserOrPortalAdmin$,
      portals: this.filteredPortals$,
      sites: this.filteredSites$,
      sitesLoading: this.store.select(sitesFeature.selectLoading),
      applications: this.myApplications$
    }).pipe(
      map((state): HeaderVM => {
        const applicationMenu = mapApplicationMenu(
          state.currentPortal,
          state.currentSite,
          state.currentApplication,
          state.applications
        )
        const siteMenu = mapSiteMenu(
          state.currentPortal,
          state.currentSite,
          state.sites.filteredSites,
          state.sites.total,
          state.isSuperUserOrPortalAdmin
        )
        const portalMenu = mapPortalMenu(
          state.currentPortal,
          state.portals.filteredPortals,
          state.portals.total,
          state.isSuperUserOrPortalAdmin
        )
        return {
          items: [
            {
              id: HeaderMenuId.Home,
              labelHiddenOnFull: true,
              type: HeaderItemType.Internal,
              label: 'GlobalHeader.Home',
              icon: 'home',
              routerLink: ['/']
            },
            ...[portalMenu, siteMenu, applicationMenu].filter(
              notNullOrUndefined
            ),
            {
              id: HeaderMenuId.User,
              type: HeaderItemType.Menu,
              labelHiddenOnCompact: true,
              label: 'GlobalHeader.User',
              name: state.currentUser.name,
              icon: 'account',
              slot: 'right',
              items: [
                {
                  id: 'profile',
                  type: HeaderItemType.Internal,
                  label: 'GlobalHeader.Profile',
                  routerLink: ['/', AppRouteSegments.MyProfile]
                },
                {
                  id: 'logout',
                  type: HeaderItemType.Internal,
                  label: 'GlobalHeader.LogOut',
                  routerLink: ['/', AppRouteSegments.LogOut]
                }
              ]
            }
          ]
        }
      })
    )
  }

  public querySites(query: string): void {
    this.siteQuery$.next(query)
  }

  public queryPortals(query: string): void {
    this.portalQuery$.next(query)
  }

  public resetSitesQuery(): void {
    this.siteQuery$.next('')
  }

  public resetPortalsQuery(): void {
    this.portalQuery$.next('')
  }
}
