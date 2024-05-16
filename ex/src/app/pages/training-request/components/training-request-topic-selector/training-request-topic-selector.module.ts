import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

// Components
import { DropdownModule } from '@components/dropdown/dropdown.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TrainingRequestTopicSelectorComponent } from './training-request-topic-selector.component'

@NgModule({
  declarations: [TrainingRequestTopicSelectorComponent],
  exports: [TrainingRequestTopicSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TranslocoRootModule,
    DropdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingRequestTopicSelectorModule {}
