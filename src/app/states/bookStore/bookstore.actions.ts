import { createAction, props } from '@ngrx/store';

export const loadBookstore = createAction('[Bookstore] Load Bookstore');
export const loadBookstoreSuccess = createAction('[Bookstore] Load Bookstore Success', props<{ bookStore: any[] }>());
export const loadBookstoreFailure = createAction('[Bookstore] Load Bookstore Failure', props<{ error: any }>());
