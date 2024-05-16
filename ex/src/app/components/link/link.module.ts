import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

import { DynamicLinkModule } from '../dynamic-link/dynamic-link.module'
import { LinkComponent } from './link.component'

@NgModule({
  declarations: [LinkComponent],
  exports: [LinkComponent],
  imports: [CommonModule, DynamicLinkModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LinkModule {}
