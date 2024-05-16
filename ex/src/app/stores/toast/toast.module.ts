import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import * as Effects from './toast.effects'
import { toastFeature } from './toast.state'
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(toastFeature),
    EffectsModule.forFeature([Effects])
  ]
})
export class ToastStoreModule {}
