import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Components
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TrainingCertificationPathRoutingModule } from './training-certification-path-routing.module'
import { TrainingCertificationPathComponent } from './training-certification-path.component'
import { TrainingsTableComponent } from './trainings-table/trainings-table.component'
import { LinkModule } from '@components/link/link.module'

@NgModule({
  declarations: [TrainingCertificationPathComponent],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TrainingCertificationPathRoutingModule,
    TranslocoRootModule,
    TrainingsTableComponent,
    LinkModule
  ]
})
export class TrainingCertificationPathModule {}
