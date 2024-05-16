import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { dragAndDropFeature } from './drag-and-drop.state'
@NgModule({
  imports: [StoreModule.forFeature(dragAndDropFeature)]
})
export class DragAndDropStoreModule {}
