import { createActionGroup, emptyProps, props } from '@ngrx/store'

export default createActionGroup({
  source: 'DragAndDrop',
  events: {
    dragOver: props<{
      items: {
        kind: string
        type: string
      }[]
    }>(),
    dragLeave: emptyProps(),
    drop: props<{
      files: File[]
    }>(),
    dragCancel: emptyProps(),
    reset: emptyProps()
  }
})
