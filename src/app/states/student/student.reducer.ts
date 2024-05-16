import { createReducer, on } from '@ngrx/store';
import { loadSessionStudentsFailure, loadSessionStudentsSuccess, loadStudentsFailure, loadStudentsSuccess } from './student.actions';
import { StudentState } from './student.interface';

export const initialState: StudentState = {
  students: [],
  sessionStudent:{ sessionStudents: [], loaded: false, error: null },
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
export const sessionStudentReducerStore = createReducer(
  initialState,
  on(loadSessionStudentsSuccess, (state, { sessionStudents }) => ({
    ...state,
    sessionStudent: {
      ...state.sessionStudent,
      sessionStudents,
      loaded: true
    }
  })),
  on(loadSessionStudentsFailure, (state, { error }) => ({
    ...state,
    sessionStudent: {
      ...state.sessionStudent,
      error
    }
  }))
);
