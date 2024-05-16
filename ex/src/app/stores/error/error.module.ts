import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { errorFeature } from './error.state'

@NgModule({
  declarations: [],
  imports: [StoreModule.forFeature(errorFeature)]
})
export class ErrorStoreModule {}
