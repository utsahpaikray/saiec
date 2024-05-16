import { ActionReducer, createFeature, createReducer, on } from '@ngrx/store'
import { MaximoContactsState } from './interfaces/state.interface'
import maximoContactActions from './maximo-contacts.actions'

const initialState: MaximoContactsState = {
  siteId: null,
  contacts: null,
  loading: false,
  error: null
}

export const reducer: ActionReducer<MaximoContactsState> = createReducer(
  initialState,
  on(maximoContactActions.getSiteContacts, (state, { siteId }) => ({
    ...initialState,
    siteId,
    loading: true
  })),
  on(
    maximoContactActions.getSiteContactsSuccess,
    (state, { siteContacts }) => ({
      ...state,
      loading: false,
      contacts: siteContacts
    })
  ),
  on(maximoContactActions.getSiteContactsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
)

export const maximoContactFeature = createFeature({
  name: 'maximoContacts',
  reducer
})
