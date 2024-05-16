import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Components
import { RouterModule } from '@angular/router'
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { PiaErrorPageComponent } from './pia-error-page.component'

@NgModule({
  declarations: [PiaErrorPageComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DefaultTemplateModule,
    TranslocoRootModule,
    RouterModule.forChild([
      {
        path: '**',
        component: PiaErrorPageComponent
      }
    ])
  ]
})
export class PiaErrorPageModule {}
