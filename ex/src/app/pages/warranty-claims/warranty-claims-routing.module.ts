import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteMaximoAccessCanReadGuard } from '@core/guards/site-maximo-access-can-read.guard'
import { WarrantyClaimsComponent } from './warranty-claims.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [SiteMaximoAccessCanReadGuard],
    component: WarrantyClaimsComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '@pages/warranty-claims-overview/warranty-claims-overview.component'
          ).then((m) => m.WarrantyClaimsOverviewComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('@pages/warranty-claim-new/warranty-claim-new.component').then(
            (m) => m.WarrantyClaimNewComponent
          )
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SiteMaximoAccessCanReadGuard]
})
export class WarrantyClaimsRoutingModule {}
