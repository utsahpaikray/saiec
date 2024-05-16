import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { TrainingRoutingModule } from './training-routing.module'
import { TrainingComponent } from './training.component'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    TrainingRoutingModule,
    TranslocoRootModule
  ]
})
export class TrainingModule {}
