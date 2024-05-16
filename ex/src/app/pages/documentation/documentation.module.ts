import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { DocumentationRoutingModule } from './documentation-routing.module'
import { DocumentationComponent } from './documentation.component'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DocumentationRoutingModule,
    TranslocoRootModule
  ]
})
export class DocumentationModule {}
