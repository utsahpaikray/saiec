import { createActionGroup, props } from '@ngrx/store'
import { Toast } from './toast.state'

export default createActionGroup({
  source: 'Toast',
  events: {
    addToast: props<{ toast: Toast }>(),
    removeToast: props<{ id: string }>()
  }
})
