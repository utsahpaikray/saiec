import { Student } from '@modules/student/student.interface';
import { createAction, props } from '@ngrx/store';

export const loadStudents = createAction('[Student] Load Students');
export const loadStudentsSuccess = createAction('[Student] Load Students Success', props<{ students: Student[] }>());
export const loadStudentsFailure = createAction('[Student] Load Students Failure', props<{ error: any }>());
