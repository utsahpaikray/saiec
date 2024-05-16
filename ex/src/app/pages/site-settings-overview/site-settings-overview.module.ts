import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { NavigationModule } from '@components/navigation/navigation.module'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { SiteSettingsOverviewComponent } from './site-settings-overview.component'
import { SiteSettingsOverviewRoutingModule } from './site-settings-overview-routing.module'

@NgModule({
  declarations: [SiteSettingsOverviewComponent],
  imports: [
    CommonModule,
    TitleModule,
    NavigationModule,
    SiteSettingsOverviewRoutingModule,
    TranslocoRootModule
  ]
})
export class SiteSettingsOverviewModule {}
