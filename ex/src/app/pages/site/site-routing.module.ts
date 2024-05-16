import { loadRemoteModule } from '@angular-architects/module-federation'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ApplicationsGuard } from '@core/guards/appliactions.guard'
import { EmployeeGuard } from '@core/guards/employee.guard'
import { SiteDetailGuard } from '@core/guards/site-detail.guard'
import { SuperUserGuard } from '@core/guards/super-user.guard'
import { siteSourceIdResolver } from '@core/resolver/site-id-resolver'
import { environment } from '@environments/environment'
import { ApplicationStoreModule } from '@stores/application/application.module'
import { Applications } from '@stores/application/interfaces/application.interface'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { SitesStoreModule } from '@stores/sites/sites.module'
import { SiteRouteSegments } from './site-route-segments.enum'
import { SiteComponent } from './site.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [SiteDetailGuard],
    component: SiteComponent,
    children: [
      {
        path: '',
        redirectTo: SiteRouteSegments.Home,
        pathMatch: 'full'
      },
      {
        path: SiteRouteSegments.Home,
        data: { module: Applications.Home },
        canActivate: [ApplicationsGuard],
        loadComponent: () =>
          import('@pages/site-home/site-home.component').then(
            (m) => m.SiteHomeComponent
          )
      },
      {
        path: SiteRouteSegments.Documentation,
        data: { module: Applications.Documentation },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/documentation/documentation.module').then(
            (m) => m.DocumentationModule
          )
      },
      {
        path: SiteRouteSegments.Contracts,
        data: { module: Applications.Contracts },
        loadChildren: () =>
          import('@pages/agreements/agreements.module').then(
            (m) => m.AgreementsModule
          )
      },
      {
        path: SiteRouteSegments.Training,
        data: { module: Applications.Training },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/training/training.module').then(
            (m) => m.TrainingModule
          )
      },
      {
        path: SiteRouteSegments.Settings,
        data: { module: Applications.Settings },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/site-settings/site-settings.module').then(
            (m) => m.SiteSettingsModule
          )
      },
      {
        path: SiteRouteSegments.Contacts,
        data: { module: Applications.Contacts },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/contacts/contacts.module').then(
            (m) => m.ContactsModule
          )
      },
      {
        path: SiteRouteSegments.Tickets,
        data: { module: Applications.Tickets },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/tickets/tickets.module').then((m) => m.TicketsModule)
      },
      {
        path: SiteRouteSegments.WarrantyClaims,
        data: { module: Applications.WarrantyClaims },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/warranty-claims/warranty-claims.module').then(
            (m) => m.WarrantyClaimsModule
          )
      },
      {
        path: SiteRouteSegments.System,
        data: { module: Applications.System },
        canActivate: [ApplicationsGuard],
        loadChildren: () =>
          import('@pages/system/system.module').then((m) => m.SystemModule)
      },
      {
        path: SiteRouteSegments.ProcessInsights,
        data: { module: Applications.ProcessInsights },
        canActivate: [EmployeeGuard, ApplicationsGuard],
        resolve: { siteId: siteSourceIdResolver },
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: `${environment.processInsights.moduleUrl}/remoteEntry.js`,
            exposedModule: './ProcessInsightsModule'
          })
            .then((m) =>
              m.ProcessInsightsModule.configure(
                environment.processInsights.moduleUrl
              )
            )
            /* TODO: Error state goes here, use the error to identify the issue */
            .catch(() =>
              import('@pages/pia-error-page/pia-error-page.module').then(
                (m) => m.PiaErrorPageModule
              )
            )
      },
      {
        path: SiteRouteSegments.Cases,
        data: { module: Applications.Cases },
        canActivate: [EmployeeGuard, ApplicationsGuard],
        loadChildren: () =>
          import(
            '@pages/contextual-collaboration/contextual-collaboration.module'
          ).then((m) => m.ContextualCollaborationModule)
      },
      {
        path: SiteRouteSegments.SiteOverview,
        data: { module: Applications.SiteOverview },
        canActivate: [SuperUserGuard, ApplicationsGuard],
        loadComponent: () =>
          loadRemoteModule(environment.microFrontends.siteOverview).then(
            (m) => m.AppComponent
          )
      },
      {
        path: SiteRouteSegments.AccessDenied,
        loadChildren: () =>
          import('@pages/access-denied/access-denied.module').then(
            (m) => m.AccessDeniedModule
          )
      },
      {
        path: SiteRouteSegments.NotFound,
        loadChildren: () =>
          import('@pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          )
      },
      {
        path: '**',
        redirectTo: SiteRouteSegments.NotFound,
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CurrentUserStoreModule,
    SitesStoreModule,
    ApplicationStoreModule
  ],
  exports: [RouterModule],
  providers: [EmployeeGuard, SiteDetailGuard, SuperUserGuard, ApplicationsGuard]
})
export class SiteRoutingModule {}
