import { NgModule } from '@angular/core'
import { DropdownComponent } from './dropdown.component'
import { DropdownItemDirective } from './dropdown-item.directive'
import { CommonModule } from '@angular/common'
import { ElementRefDirective } from '@shared/directives/element-ref/element-ref.directive'
import { TemplateRefDirective } from '@shared/directives/template-ref/template-ref.directive'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@NgModule({
  declarations: [DropdownComponent, DropdownItemDirective],
  imports: [CommonModule, ElementRefDirective, TemplateRefDirective],
  exports: [DropdownComponent, DropdownItemDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DropdownModule {}
