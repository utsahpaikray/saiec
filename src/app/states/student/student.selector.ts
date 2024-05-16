import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.interface';

// Select the entire student state
export const selectStudentState = createFeatureSelector<StudentState>('students');

// Select the list of students
export const selectStudents = createSelector(
  selectStudentState,
  (state: StudentState) => state.students
);
// Select the  of student with id
export const selectStudentById = (studentId: string) =>
  createSelector(
    selectStudents,
    (state) => state.find((item) => item.$id === studentId)
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

export const selectSessionStudentState = createFeatureSelector<StudentState>('sessionStudents');

export const selectSessionStudents = createSelector(
  selectSessionStudentState,
  (state) => state.sessionStudent.sessionStudents
);

export const selectLoaded = createSelector(
  selectSessionStudentState,
  (state) => state.sessionStudent.loaded
);