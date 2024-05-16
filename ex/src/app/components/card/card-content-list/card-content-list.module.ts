import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CardContentListComponent } from './card-content-list.component'

@NgModule({
  declarations: [CardContentListComponent],
  exports: [CardContentListComponent],
  imports: [CommonModule]
})
export class CardContentListModule {}
