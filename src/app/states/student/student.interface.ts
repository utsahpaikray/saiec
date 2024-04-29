import { Student } from "@modules/student/student.interface";

export interface StudentState {
    students: Student[];
    loaded: boolean;
  }