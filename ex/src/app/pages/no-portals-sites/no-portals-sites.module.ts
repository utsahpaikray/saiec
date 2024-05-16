import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TitleModule } from '@components/title/title.module'
import { NoPortalsSitesComponent } from './no-portals-sites.component'
import { NoPortalsSitesRoutingModule } from './no-portals-sites-routing.module'

@NgModule({
  declarations: [NoPortalsSitesComponent],
  imports: [
    CommonModule,
    TitleModule,
    NoPortalsSitesRoutingModule,
    DefaultTemplateModule,
    TranslocoRootModule
  ]
})
export class NoPortalsSitesModule {}
