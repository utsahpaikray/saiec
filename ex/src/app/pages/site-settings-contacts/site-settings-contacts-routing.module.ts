import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteSettingsContactsComponent } from './site-settings-contacts.component'

const routes: Routes = [
  {
    path: '',
    component: SiteSettingsContactsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteSettingsContactsRoutingModule {}
