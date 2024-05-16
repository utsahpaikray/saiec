import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ContentTemplateComponent } from './content-template.component'

@NgModule({
  declarations: [ContentTemplateComponent],
  exports: [ContentTemplateComponent],
  imports: [CommonModule]
})
export class ContentTemplateModule {}
