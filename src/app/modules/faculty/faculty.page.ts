import {
  Component,
  OnInit
} from '@angular/core';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { AppState } from 'src/app/states/student/student.interface';
import { Store, select } from '@ngrx/store';
import { loadFaculty } from 'src/app/states/faculty/faculty.actions';
import { selectFaculty } from 'src/app/states/faculty/faculty.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.page.html',
  styleUrls: ['./faculty.page.scss'],
})
export class FacultyPage implements OnInit {
  faculty$!: Observable<any>;

  constructor(public firebaseService:FirebaseService, private store:Store<AppState>) {}
  public facultyList:any[] = [];
  ngOnInit() {
    this.getFacultyFromStore();
this.faculty$.subscribe(faculty=>{
  console.log(faculty)
  this.facultyList=faculty;
})
  }
  getFacultyFromStore(){
    this.store.dispatch(loadFaculty()); // Dispatch action to load students
    // this.totalStudent$ = this.store.pipe(select(selectTotalStudents));
    this.faculty$ = this.store.pipe(select(selectFaculty))
    // this.loaded$ = this.store.pipe(select(selectLoadedStatus))
}

}