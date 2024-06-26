import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '@modules/student/student.interface';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@shared-service/auth-service.service';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/states/state.interface';
import { loadStudents } from 'src/app/states/student/student.actions';
import { selectLoadedStatus, selectStudents, selectTotalStudents } from 'src/app/states/student/student.selector';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  searchQuery: any;

  constructor( private store:Store<AppState>) { }
  private router = inject(Router)
  private authService = inject(AuthService)
  totalStudent$!: Observable<number>;
  students$!: Observable<Student[]>;
  loaded$!: Observable<boolean>;
  public isAuthorized: boolean =  false;
  public editLabel = "Edit"

  ngOnInit() {
    this.getStudentsFromStore()
    this.isAuthorized = this.authService.isAuthorizedUser
}

  getStudentsFromStore(){
    this.store.dispatch(loadStudents()); // Dispatch action to load students
    this.totalStudent$ = this.store.pipe(select(selectTotalStudents));
    this.students$ = this.store.pipe(select(selectStudents))
    this.loaded$ = this.store.pipe(select(selectLoadedStatus))
}
edit(id: any){
  this.router.navigate([`/contacts/${id}`]);
  }
  public onInput() {
    const elements = document?.querySelectorAll('.student-info');
    const items = Array.from(elements ?? []);
    requestAnimationFrame(() => {
        items.forEach((item: any) => {
                const shouldShow = item.innerText.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
                item['style'].display = shouldShow ? 'block' : 'none';
        });

    });
}
}
