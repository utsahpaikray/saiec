import { Student } from "@modules/student/student.interface";
export interface StudentState {
    students: Student[];
    sessionStudent: { sessionStudents: Student[], loaded: boolean, error: any } 
    loaded: boolean;
}