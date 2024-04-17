import { createAction, props } from '@ngrx/store';

export const loadFaculty = createAction('[Student] Load Faculty');
export const loadFacultySuccess = createAction('[Student] Load Faculty Success', props<{ faculty: any[] }>());
export const loadFacultyFailure = createAction('[Student] Load Faculty Failure', props<{ error: any }>());
