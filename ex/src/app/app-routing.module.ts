import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@core/guards/auth.guard'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { AppRouteSegments } from './app-route-segments.enum'

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRouteSegments.Portals,
    pathMatch: 'full'
  },
  {
    path: AppRouteSegments.Portals,
    loadChildren: () =>
      import('@pages/portals/portals.module').then((m) => m.PortalsModule)
  },
  {
    path: AppRouteSegments.Users,
    loadChildren: () =>
      import('@pages/users/users.module').then((m) => m.UsersModule)
  },
  {
    path: AppRouteSegments.MyProfile,
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('@pages/my-profile/my-profile.component').then(
        (m) => m.MyProfileComponent
      )
  },
  {
    path: AppRouteSegments.TermsAndConditions,
    loadChildren: () =>
      import('@pages/terms-and-conditions/terms-and-conditions.module').then(
        (m) => m.TermsAndConditionsModule
      )
  },
  {
    path: AppRouteSegments.AccessDenied,
    loadChildren: () =>
      import('@pages/access-denied/access-denied.module').then(
        (m) => m.AccessDeniedModule
      )
  },
  {
    path: AppRouteSegments.LogOut,
    data: { logout: true },
    loadComponent: () =>
      import('@pages/logout/logout.component').then((m) => m.LogoutComponent)
  },
  {
    path: AppRouteSegments.NotFound,
    loadChildren: () =>
      import('@pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  },
  {
    path: '**',
    redirectTo: AppRouteSegments.NotFound,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always'
    }),
    CurrentUserStoreModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
