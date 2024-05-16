import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { AssertiveTextComponent } from '../assertive-text/assertive-text.component'
import { SearchInputComponent } from './search-input.component'

@NgModule({
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormsModule,
    AssertiveTextComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchInputModule {}
