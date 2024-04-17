import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { studentReducerStore } from './faculty.reducer'
import { StudentEffects } from './faculty.effects'

@NgModule({
  declarations: [],
  imports: [
    
    // EffectsModule.forFeature([StudentEffects])
    // EffectsModule.forFeature([StudentEffects]),
    // StoreModule.forFeature(portalsFeature)
  ]
})
export class StudentStoreModule {}