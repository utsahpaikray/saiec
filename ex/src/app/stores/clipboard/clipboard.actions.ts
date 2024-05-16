import { createActionGroup, emptyProps, props } from '@ngrx/store'

export default createActionGroup({
  source: 'clipboard',
  events: {
    copyToClipBoard: props<{ text: string }>(),
    copyToClipBoardSuccess: emptyProps(),
    copyToClipBoardFailure: props<{ error: Error }>()
  }
})
