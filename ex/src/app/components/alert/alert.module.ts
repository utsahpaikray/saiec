import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DynamicLinkModule } from '../dynamic-link/dynamic-link.module'
import { AlertComponent } from './alert.component'

@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [CommonModule, RouterModule, DynamicLinkModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlertModule {}
