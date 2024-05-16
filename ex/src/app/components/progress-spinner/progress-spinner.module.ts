import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

import { ProgressSpinnerComponent } from './progress-spinner.component'

@NgModule({
  declarations: [ProgressSpinnerComponent],
  exports: [ProgressSpinnerComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProgressSpinnerModule {}
