import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AssertiveTextComponent } from '../assertive-text/assertive-text.component'

import { DropdownComponent } from './dropdown.component'

@NgModule({
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
  imports: [CommonModule, FormsModule, AssertiveTextComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropdownModule {}
