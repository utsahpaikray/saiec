import { createActionGroup, props } from '@ngrx/store'
import { SiteContact } from './interfaces/state.interface'

export default createActionGroup({
  source: 'MaximoContacts',
  events: {
    getSiteContacts: props<{ siteId: string }>(),
    getSiteContactsSuccess: props<{ siteContacts: SiteContact[] }>(),
    getSiteContactsFailure: props<{ error: Error }>()
  }
})
