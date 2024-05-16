import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import * as Effects from './clipboard.effects'

@NgModule({
  declarations: [],
  imports: [EffectsModule.forFeature([Effects])]
})
export class ClipboardStoreModule {}
