import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SuperUserOrPortalAdminGuard } from '@core/guards/super-user-or-portal-admin.guard'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { SiteSettingsRouteSegments } from './site-settings-route-segments.enum'
import { SiteSettingsComponent } from './site-settings.component'

const routes: Routes = [
  {
    path: '',
    component: SiteSettingsComponent,
    canActivate: [SuperUserOrPortalAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '@pages/site-settings-overview/site-settings-overview.module'
          ).then((m) => m.SiteSettingsOverviewModule)
      },
      {
        path: SiteSettingsRouteSegments.Documentation,
        loadChildren: () =>
          import(
            '@pages/site-settings-documentation/site-settings-documentation.module'
          ).then((m) => m.SiteSettingsDocumentationModule)
      },
      {
        path: SiteSettingsRouteSegments.Contacts,
        loadChildren: () =>
          import(
            '@pages/site-settings-contacts/site-settings-contacts.module'
          ).then((m) => m.SiteSettingsContactsModule)
      },
      {
        path: SiteSettingsRouteSegments.General,
        loadComponent: () =>
          import(
            '@pages/site-settings-general/site-settings-general.component'
          ).then((m) => m.SiteSettingsGeneralComponent)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), CurrentUserStoreModule],
  exports: [RouterModule]
})
export class SiteSettingsRoutingModule {}
