import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { studentReducerStore } from './student.reducer'
import { StudentEffects } from './student.effects'

@NgModule({
  declarations: [],
  imports: [
    
    // EffectsModule.forFeature([StudentEffects])
    // EffectsModule.forFeature([StudentEffects]),
    // StoreModule.forFeature(portalsFeature)
  ]
})
export class StudentStoreModule {}