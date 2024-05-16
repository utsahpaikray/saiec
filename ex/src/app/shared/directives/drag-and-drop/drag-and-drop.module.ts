import { NgModule } from '@angular/core'
import { DragAndDropDirective } from './drag-and-drop.directive'
import { DragAndDropStoreModule } from '@stores/drag-and-drop/drag-and-drop.module'

@NgModule({
  declarations: [DragAndDropDirective],
  imports: [DragAndDropStoreModule],
  exports: [DragAndDropDirective]
})
export class DragAndDropModule {}
