import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteSettingsOverviewComponent } from './site-settings-overview.component'

const routes: Routes = [
  {
    path: '',
    component: SiteSettingsOverviewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteSettingsOverviewRoutingModule {}
