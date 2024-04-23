import { createAction, props } from '@ngrx/store';

export const loadFaculty = createAction('[Faculty] Load Faculty');
export const loadFacultySuccess = createAction('[Faculty] Load Faculty Success', props<{ faculty: any[] }>());
export const loadFacultyFailure = createAction('[Faculty] Load Faculty Failure', props<{ error: any }>());
