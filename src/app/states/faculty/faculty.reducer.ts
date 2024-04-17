import { createReducer, on } from '@ngrx/store';
import { facultyState } from './faculty.interface';
import { loadFacultyFailure, loadFacultySuccess } from './faculty.actions';


export const initialState: facultyState = {
  faculty: [],
  loaded: false
};

export const facultyReducerStore = createReducer(
  initialState,
  on(loadFacultySuccess, (state, { faculty }) => ({
    ...state,
    faculty,
    loaded: true
  })),
  on(loadFacultyFailure, (state, { error }) => ({
    ...state,
    error
  }))
);