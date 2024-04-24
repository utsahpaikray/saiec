import { Component, OnInit } from '@angular/core';
import { Student } from '@modules/student/student.interface';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/states/state.interface';
import { loadStudents } from 'src/app/states/student/student.actions';
import { selectTotalStudents, selectStudents, selectLoadedStatus } from 'src/app/states/student/student.selector';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor( private store:Store<AppState>) { }

  totalStudent$!: Observable<number>;
  students$!: Observable<Student[]>;
  loaded$!: Observable<boolean>;
  ngOnInit() {
    this.getStudentsFromStore()
}

  getStudentsFromStore(){
    this.store.dispatch(loadStudents()); // Dispatch action to load students
    this.totalStudent$ = this.store.pipe(select(selectTotalStudents));
    this.students$ = this.store.pipe(select(selectStudents))
    this.loaded$ = this.store.pipe(select(selectLoadedStatus))
}
}
