import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SitesComponent } from './sites.component'

const routes: Routes = [
  {
    path: '',
    component: SitesComponent,
    children: [
      {
        path: ':siteId',
        loadChildren: () =>
          import('@pages/site/site.module').then((m) => m.SiteModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {}
