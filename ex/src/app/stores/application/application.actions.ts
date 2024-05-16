import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Applications } from './interfaces/application.interface'
import { AppState } from './interfaces/state.interface'

export default createActionGroup({
  source: 'Applications',
  events: {
    updateApplications: props<Partial<Record<Applications, AppState>>>(),
    updateCurrentApplication: props<{ application: Applications }>(),
    resetCurrentApplication: emptyProps()
  }
})
