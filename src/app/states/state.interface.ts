import { StudentState } from "./student/student.interface";

export interface AppState {
    products:StudentState[];
    faculty:any[];
    bookStore:any[]
}