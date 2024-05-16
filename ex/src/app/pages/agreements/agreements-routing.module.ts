import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteMaximoAccessCanReadGuard } from '@core/guards/site-maximo-access-can-read.guard'

import { AgreementsComponent } from './agreements.component'

const routes: Routes = [
  {
    path: '',
    component: AgreementsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pages/agreements-overview/agreements-overview.module').then(
            (m) => m.AgreementsOverviewModule
          )
      },
      {
        path: ':servicePackageSlug',
        loadComponent: () =>
          import(
            '@pages/agreements-service-package/agreements-service-package.component'
          ).then((m) => m.AgreementsServicePackageComponent)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SiteMaximoAccessCanReadGuard]
})
export class AgreementsRoutingModule {}
