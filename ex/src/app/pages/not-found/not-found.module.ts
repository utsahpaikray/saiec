import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { NotFoundComponent } from './not-found.component'
import { NotFoundRoutingModule } from './not-found-routing.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NotFoundRoutingModule,
    DefaultTemplateModule,
    TranslocoRootModule
  ]
})
export class NotFoundModule {}
