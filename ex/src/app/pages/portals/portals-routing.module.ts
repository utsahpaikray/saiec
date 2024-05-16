import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@core/guards/auth.guard'
import { PortalOverviewGuard } from '@core/guards/portal-overview.guard'
import { PortalsGuard } from '@core/guards/portals.guard'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { PortalsStoreModule } from '@stores/portals/portals.module'
import { PortalsRouteSegments } from './portals-route-segments'
import { PortalsComponent } from './portals.component'
const routes: Routes = [
  {
    path: '',
    component: PortalsComponent,
    canActivate: [AuthGuard, PortalsGuard],
    children: [
      {
        path: '',
        redirectTo: PortalsRouteSegments.Overview,
        pathMatch: 'full'
      },
      {
        path: PortalsRouteSegments.Overview,
        canActivate: [PortalOverviewGuard],
        loadComponent: () =>
          import('@pages/portals-overview/portals-overview.component').then(
            (m) => m.PortalsOverviewComponent
          )
      },
      {
        path: ':portalId',
        loadChildren: () =>
          import('@pages/portal/portal.module').then((m) => m.PortalModule)
      },
      {
        path: PortalsRouteSegments.NoPortals,
        loadChildren: () =>
          import('@pages/no-portals-sites/no-portals-sites.module').then(
            (m) => m.NoPortalsSitesModule
          )
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CurrentUserStoreModule,
    PortalsStoreModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, PortalsGuard, PortalOverviewGuard]
})
export class PortalsRoutingModule {}
