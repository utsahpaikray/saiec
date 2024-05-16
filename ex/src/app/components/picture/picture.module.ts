import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PictureComponent } from './picture.component'

@NgModule({
  declarations: [PictureComponent],
  exports: [PictureComponent],
  imports: [CommonModule]
})
export class PictureModule {}
