import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookStoreState } from './bookstore.interface';

// Select the entire student state
export const selectBookStoreState = createFeatureSelector<bookStoreState>('bookStore');

// Select the list of students
export const selectBookStore = createSelector(
  selectBookStoreState,
  (state: bookStoreState) => state.bookStore
);

// // Select the total number of students
export const selectTotalBookItems = createSelector(
  selectBookStore,
  (bookStore) => bookStore.length
);

// Select the loading status
export const selectLoadedStatus = createSelector(
  selectBookStoreState,
  (state: bookStoreState) => state.loaded
);
