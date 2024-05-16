import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PortalDetailGuard } from '@core/guards/portal-detail.guard'
import { SingleSiteGuard } from '@core/guards/single-site.guard'
import { SuperUserOrPortalAdminGuard } from '@core/guards/super-user-or-portal-admin.guard'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { PortalsStoreModule } from '@stores/portals/portals.module'
import { PortalRouteSegments } from './portal-route-segments.enum'
import { PortalComponent } from './portal.component'
const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    canActivate: [PortalDetailGuard],
    children: [
      {
        path: '',
        redirectTo: PortalRouteSegments.Home,
        pathMatch: 'full'
      },
      {
        path: PortalRouteSegments.Home,
        canActivate: [SingleSiteGuard],
        loadComponent: () =>
          import('@pages/portal-home/portal-home.component').then(
            (m) => m.PortalHomeComponent
          )
      },
      {
        path: PortalRouteSegments.Sites,
        loadChildren: () =>
          import('@pages/sites/sites.module').then((m) => m.SitesModule)
      },
      {
        path: PortalRouteSegments.Users,
        loadChildren: () =>
          import('@pages/portal-users/portal-users.module').then(
            (m) => m.PortalUsersModule
          )
      },
      {
        path: PortalRouteSegments.NotFound,
        loadChildren: () =>
          import('@pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          )
      },
      {
        path: PortalRouteSegments.AccessDenied,
        loadChildren: () =>
          import('@pages/access-denied/access-denied.module').then(
            (m) => m.AccessDeniedModule
          )
      },
      {
        path: '**',
        redirectTo: PortalRouteSegments.NotFound,
        pathMatch: 'full'
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
  providers: [SuperUserOrPortalAdminGuard, PortalDetailGuard, SingleSiteGuard]
})
export class PortalRoutingModule {}
