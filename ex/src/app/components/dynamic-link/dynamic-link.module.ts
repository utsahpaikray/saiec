import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DynamicLinkComponent } from './dynamic-link.component'

@NgModule({
  declarations: [DynamicLinkComponent],
  exports: [DynamicLinkComponent],
  imports: [CommonModule, RouterModule]
})
export class DynamicLinkModule {}
