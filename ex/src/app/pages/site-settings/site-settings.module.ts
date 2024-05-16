import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Components
import { SiteSettingsRoutingModule } from './site-settings-routing.module'
import { SiteSettingsComponent } from './site-settings.component'

@NgModule({
  declarations: [SiteSettingsComponent],
  imports: [CommonModule, SiteSettingsRoutingModule]
})
export class SiteSettingsModule {}
