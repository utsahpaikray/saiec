import { StudentState } from "./student/student.interface";

export interface AppState {
    students:StudentState[];
    faculty:any[];
    bookStore:any[]
}