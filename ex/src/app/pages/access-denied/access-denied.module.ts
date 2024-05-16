import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { AccessDeniedComponent } from './access-denied.component'
import { AccessDeniedRoutingModule } from './access-denied-routing.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TitleModule } from '@components/title/title.module'

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    AccessDeniedRoutingModule,
    TranslocoRootModule,
    DefaultTemplateModule,
    TitleModule
  ]
})
export class AccessDeniedModule {}
