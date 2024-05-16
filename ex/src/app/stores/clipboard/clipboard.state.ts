import { createFeature, createReducer } from '@ngrx/store'

export const reducer = createReducer({})

export const clipboardFeature = createFeature({
  name: 'clipboard',
  reducer
})
