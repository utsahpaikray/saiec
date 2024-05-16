import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

// Components
import { DropdownModule } from '@components/dropdown/dropdown.module'
import { ConfirmationModalModule } from '@components/confirmation-modal/confirmation-modal.module'
import { ComponentsModule } from '@components/components.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TrainingRequestComponent } from './training-request.component'
import { TrainingRequestRoutingModule } from './training-request-routing.module'
import { ParticipantsModule } from './components/participants/participants.module'
import { TrainingRequestBackLinkComponent } from './components/training-request-back-link/training-request-back-link.component'
import { TrainingRequestTopicSelectorModule } from './components/training-request-topic-selector/training-request-topic-selector.module'
import { FormModule } from '@components/form/form.module'
import { AlertModule } from '@components/alert/alert.module'

@NgModule({
  declarations: [TrainingRequestComponent, TrainingRequestBackLinkComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ProgressSpinnerModule,
    TrainingRequestRoutingModule,
    TrainingRequestTopicSelectorModule,
    TranslocoRootModule,
    ParticipantsModule,
    ReactiveFormsModule,
    DropdownModule,
    ConfirmationModalModule,
    FormModule,
    AlertModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingRequestModule {}
