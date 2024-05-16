import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CardMetaComponent } from './card-meta.component'

@NgModule({
  declarations: [CardMetaComponent],
  exports: [CardMetaComponent],
  imports: [CommonModule]
})
export class CardMetaModule {}
