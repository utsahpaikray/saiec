import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@core/guards/auth.guard'
import { SuperUserOrPortalAdminGuard } from '@core/guards/super-user-or-portal-admin.guard'

import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { UsersComponent } from './users.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, SuperUserOrPortalAdminGuard],
    component: UsersComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pages/user-overview/user-overview.module').then(
            (m) => m.UserOverviewModule
          )
      },
      {
        path: ':id',
        loadComponent: () =>
          import('@pages/user-profile/user-profile.component').then(
            (m) => m.UserProfileComponent
          )
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), CurrentUserStoreModule],
  exports: [RouterModule],
  providers: [AuthGuard, SuperUserOrPortalAdminGuard]
})
export class UsersRoutingModule {}
