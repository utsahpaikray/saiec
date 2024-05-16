import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  inject
} from '@angular/core'
import { Store } from '@ngrx/store'
import dragAndDropActions from '@stores/drag-and-drop/drag-and-drop.actions'

@Directive({
  selector: `[appDragAndDrop]`
})
export class DragAndDropDirective implements OnDestroy {
  @Input({ alias: 'appDragAndDrop', required: true })
  public mode: 'host' | 'target'

  private store = inject(Store)
  private elementRef = inject(ElementRef<EventTarget>)

  @HostListener('dragover', ['$event'])
  protected onDragOver = (event: DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer?.items) {
      this.store.dispatch(
        dragAndDropActions.dragOver({
          items: Array.from(event.dataTransfer.items).map((item) => ({
            kind: item.kind,
            type: item.type
          }))
        })
      )
    }
  }
  @HostListener('dragleave', ['$event'])
  protected onDragLeave = (event: DragEvent) => {
    if (event.target !== this.elementRef.nativeElement) {
      return
    }
    event.preventDefault()
    this.store.dispatch(dragAndDropActions.dragLeave())
  }
  @HostListener('drop', ['$event'])
  protected onDrop(event: DragEvent) {
    if (this.mode === 'host') {
      this.store.dispatch(dragAndDropActions.dragCancel())
      return
    }
    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer?.files) {
      this.store.dispatch(
        dragAndDropActions.drop({
          files: Array.from(event.dataTransfer.files)
        })
      )
    } else {
      this.store.dispatch(dragAndDropActions.dragCancel())
    }
  }

  public ngOnDestroy(): void {
    this.store.dispatch(dragAndDropActions.reset())
  }
}
