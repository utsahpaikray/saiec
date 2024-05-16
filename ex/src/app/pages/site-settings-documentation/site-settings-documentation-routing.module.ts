import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteSettingsDocumentationComponent } from './site-settings-documentation.component'

const routes: Routes = [
  {
    path: '',
    component: SiteSettingsDocumentationComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteSettingsDocumentationRoutingModule {}
