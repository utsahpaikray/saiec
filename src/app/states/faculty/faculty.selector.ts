import { createFeatureSelector, createSelector } from '@ngrx/store';
import { facultyState } from './faculty.interface';

// Select the entire student state
export const selectFacultyStateState = createFeatureSelector<facultyState>('faculty');

// Select the list of students
export const selectFaculty = createSelector(
  selectFacultyStateState,
  (state: facultyState) => state.faculty
);

// Select the total number of students
export const selectTotalFaculty = createSelector(
  selectFaculty,
  (faculty) => faculty.length
);

// Select the loading status
export const selectLoadedStatus = createSelector(
  selectFacultyStateState,
  (state: facultyState) => state.loaded
);
