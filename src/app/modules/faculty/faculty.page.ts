import { Component, OnInit, inject, signal } from '@angular/core';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { Store, select } from '@ngrx/store';
import { loadFaculty } from 'src/app/states/faculty/faculty.actions';
import { selectFaculty } from 'src/app/states/faculty/faculty.selector';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/states/state.interface';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.page.html',
  styleUrls: ['./faculty.page.scss'],
})
export class FacultyPage implements OnInit {
  private firebaseService = inject(FirebaseService);
  private store = inject(Store<AppState>);

  facultyList = signal<any[]>([]);
  faculty$: Observable<any> = this.store.pipe(select(selectFaculty));

  constructor() {}

  ngOnInit() {
    this.getFacultyFromStore();
    this.faculty$.subscribe((faculty) => {
      this.facultyList.set(faculty);
    });
  }

  getFacultyFromStore() {
    this.store.dispatch(loadFaculty());
  }
}