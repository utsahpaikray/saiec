import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { DefaultTemplateComponent } from './default-template.component'

@NgModule({
  declarations: [DefaultTemplateComponent],
  exports: [DefaultTemplateComponent],
  imports: [CommonModule]
})
export class DefaultTemplateModule {}
