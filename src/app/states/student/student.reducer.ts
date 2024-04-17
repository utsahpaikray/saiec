import { createReducer, on } from '@ngrx/store';
import { loadStudentsFailure, loadStudentsSuccess } from './student.actions';
import { StudentState } from './student.interface';

export const initialState: StudentState = {
  students: [],
  loaded: false
};

export const studentReducerStore = createReducer(
  initialState,
  on(loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loaded: true
  })),
  on(loadStudentsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);