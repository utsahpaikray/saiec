import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.interface';

// Select the entire student state
export const selectStudentState = createFeatureSelector<StudentState>('students');

// Select the list of students
export const selectStudents = createSelector(
  selectStudentState,
  (state: StudentState) => state.students
);

// Select the total number of students
export const selectTotalStudents = createSelector(
  selectStudents,
  (students) => students.length
);

// Select the loading status
export const selectLoadedStatus = createSelector(
  selectStudentState,
  (state: StudentState) => state.loaded
);
