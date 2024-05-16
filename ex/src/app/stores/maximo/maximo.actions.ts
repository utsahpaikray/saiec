import { createActionGroup, props } from '@ngrx/store'
import { Maximo } from './interfaces/state.interface'

export default createActionGroup({
  source: 'Maximo',
  events: {
    getMaximoAccess: props<{ siteId: string }>(),
    getMaximoAccessSuccess: props<{ maximoAccess: Maximo }>(),
    getMaximoAccessFailure: props<{ error: Error }>()
  }
})
