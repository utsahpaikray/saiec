import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

// Components
import { ComponentsModule } from '@components/components.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TrainingOverviewRoutingModule } from './training-overview-routing.module'
import { TrainingOverviewComponent } from './training-overview.component'

@NgModule({
  declarations: [TrainingOverviewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ProgressSpinnerModule,
    TrainingOverviewRoutingModule,
    TranslocoRootModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingOverviewModule {}
