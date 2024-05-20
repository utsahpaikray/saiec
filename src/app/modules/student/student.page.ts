import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { groupBy, values } from 'lodash';
import {
    BehaviorSubject,
    Observable,
    combineLatest,
    filter,
    map,
    shareReplay
} from 'rxjs';
import { AppState } from 'src/app/states/state.interface';
import { loadSessionStudents, loadStudents } from '../../states/student/student.actions';
import {
  selectLoaded,
    selectLoadedStatus,
    selectSessionStudents,
    selectStudents
} from '../../states/student/student.selector';
import { ModalPage } from '../shared/modal/modal.page';
import { Student } from './student.interface';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  private modalCtrl = inject(ModalController);
  private router = inject(Router);
  private store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);
  public firebaseService = inject(FirebaseService)
  gridValue = signal(false);
  searchQuery = signal('');
  itemsCount = signal(1);
  title = signal('');

  sortByProperty$: Observable<string> = new BehaviorSubject('class');
  students$: Observable<Student[]> = this.store.pipe(select(selectSessionStudents));

  allStudentInfo$ = combineLatest([
    this.students$.pipe(filter((students) => !!students)), // Filtering out null and undefined values
    this.sortByProperty$,
  ]).pipe(
    map(([students, sortByProperty]) => this.sortStudents(students, sortByProperty)),
    shareReplay()
  );
  totalStudent$ = this.allStudentInfo$.pipe(
    map((students) => students.filter((student) => student['2024-2025'] == true || student['Status'] == true)),
    map((filteredStudents) => filteredStudents.length),
  );
  
  

  allStudentClassWise$ = combineLatest([this.allStudentInfo$, this.sortByProperty$]).pipe(
    map(([students, property]) => this.sortStudents(students, property)),
    shareReplay()
  );

  loaded$: Observable<boolean> = this.store.pipe(select(selectLoaded));

  ngOnInit() {
    // this.firebaseService.getFileList()
    this.store.dispatch(loadSessionStudents());
    const data = this.route.snapshot.data;
    this.title.set(data['title']);
  }

  private sortStudents(students: Student[], property: string): Student[] {
    if (!students || students.length === 0) {
      return [];
    }

    const groupedStudents = groupBy(students, property);
    const studentArrays = values(groupedStudents);
    return Array.prototype.concat(...studentArrays);
  }

  onInput() {
    const searchQuery = this.searchQuery().trim().toLowerCase();
    const elements = document?.querySelector('.student-info')?.children;
    const items = Array.from(elements ?? []);

    this.itemsCount.set(0);
    requestAnimationFrame(() => {
      items.forEach((item) => {
        Array.from(item.children).forEach((item: any) => {
          const shouldShow = item.textContent.toLowerCase().includes(searchQuery);
          this.itemsCount.update((count) => (shouldShow ? count + 1 : count));
          item['style'].display = shouldShow ? 'block' : 'none';
        });
      });
    });
  }

  async showModal(info: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: { info },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop(),
    });
    return await modal.present();
  }

  showReport(std: any) {
    this.router.navigate([`/report/${std.StudentName}`]);
  }

  generateAutoFeeStructure(data: any[]) {
    const flatData = data.flat(2);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const autoFeeMonthwise = [];

    months.forEach((month) => {
      const studentInfoArray: any[] = [];
      flatData.forEach((element) => {
        const studentInfo = {
          name: element.StudentName,
          mobile: element.MobileNumber,
          class: element.class,
          FatherName: element.FatherName,
          value: 0,
        };
        studentInfoArray.push(studentInfo);
      });
      autoFeeMonthwise.push({ month, studentInf: studentInfoArray });
    });
  }
//   updateStudentStatus(){
//     this.allStudentInfo$.subscribe((students: Student[])=>{
//         students = students.map(std => {
//             if(std.Status == "Active"){
//                 let student = {...std, Status: true, "2024-2025": true, "2022-2023": true, "2023-2024": true};
//                 this.updateStudent(student.$id,student)
//                 return student
//             } else {
//                 return std;
//             }
//         });
//         console.log(students)
//     });
// }

//   public updateStudent(id:string, data:Student) {
//     console.log(data)
//   // this.firebaseService.updateStudent('studentInfo',id,data)
//    }
}