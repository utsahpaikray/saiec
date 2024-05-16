import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { AssertiveTextComponent } from '../assertive-text/assertive-text.component'
import { TextAreaComponent } from './text-area.component'

@NgModule({
  declarations: [TextAreaComponent],
  exports: [TextAreaComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormsModule,
    AssertiveTextComponent
  ]
})
export class TextAreaModule {}
