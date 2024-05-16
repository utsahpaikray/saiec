import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SuperUserOrPortalAdminGuard } from '@core/guards/super-user-or-portal-admin.guard'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { PortalUsersComponent } from './portal-users.component'

const routes: Routes = [
  {
    path: '',
    component: PortalUsersComponent,
    canActivate: [SuperUserOrPortalAdminGuard],
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
  exports: [RouterModule]
})
export class PortalUsersRoutingModule {}
