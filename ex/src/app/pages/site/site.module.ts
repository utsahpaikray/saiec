import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { FullContentTemplateComponent } from '@features/templates/full-content-template/full-content-template.component'
import { SiteDetailStoreModule } from '@stores/site-details/site-detail.module'
import { SiteRoutingModule } from './site-routing.module'
import { SiteComponent } from './site.component'

@NgModule({
  declarations: [SiteComponent],
  imports: [
    CommonModule,
    DefaultTemplateModule,
    SiteRoutingModule,
    FullContentTemplateComponent,
    SiteDetailStoreModule
  ]
})
export class SiteModule {}
