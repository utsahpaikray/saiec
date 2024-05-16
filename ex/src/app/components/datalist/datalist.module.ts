import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AssertiveTextComponent } from '../assertive-text/assertive-text.component'

import { DatalistComponent } from './datalist.component'

@NgModule({
  declarations: [DatalistComponent],
  exports: [DatalistComponent],
  imports: [CommonModule, FormsModule, AssertiveTextComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatalistModule {}
