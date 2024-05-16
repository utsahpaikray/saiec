import { NgModule } from '@angular/core'
import { ControlRequiredPipe } from './control-required.pipe'

@NgModule({
  declarations: [ControlRequiredPipe],
  exports: [ControlRequiredPipe]
})
export class ControlRequiredModule {}
