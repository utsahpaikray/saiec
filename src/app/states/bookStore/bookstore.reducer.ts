import { createReducer, on } from '@ngrx/store';
import { bookStoreState } from './bookstore.interface';
import { loadBookstoreFailure, loadBookstoreSuccess } from './bookstore.actions';

export const initialState: bookStoreState = {
  bookStore: [],
  loaded: false
};

export const bookReducerStore = createReducer(
  initialState,
  on(loadBookstoreSuccess, (state, { bookStore }) => ({
    ...state,
    bookStore,
    loaded: true
  })),
  on(loadBookstoreFailure, (state, { error }) => ({
    ...state,
    error
  }))
);