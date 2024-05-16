import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { SectionAsideRightComponent } from './section-aside-right.component'

@NgModule({
  declarations: [SectionAsideRightComponent],
  exports: [SectionAsideRightComponent],
  imports: [CommonModule]
})
export class SectionAsideRightModule {}
