import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { groupBy, sortBy, values } from 'lodash';
import { DownloadUrlService } from '@shared-service/download-url.service';
import { FirebaseService } from '@shared-service/firebaseService/firebase-service.service';
import { ModalPage } from '../shared/modal/modal.page';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest, filter, map, mergeMap, of, startWith, switchMap, tap } from 'rxjs';
import { selectLoadedStatus, selectStudents, selectTotalStudents } from '../../states/student/student.selector';
import { loadStudents } from '../../states/student/student.actions';
import { Student } from './student.interface';
import { AppState } from 'src/app/states/state.interface';
@Component({
    selector: 'app-student',
    templateUrl: './student.page.html',
    styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
    public allStudentInfo: Student[]=[];
    public gridValue: boolean = false;
    searchQuery: any;
    allStudent: Student[] = [];
    itemsCount: number = 1;
    allStudentClassWise: any[]= [];
    inSchoolStudentData: any[]=[];
    totalStudent: number = 0;
    hexString = "0123456789abcdef";
    loaded=false;
    sortByProperty = 'class'
    totalStudent$!: Observable<number>;
    students$: Observable<Student[]> =of([]);
    loaded$!: Observable<boolean>;
    title = signal('');
    public allStudentInfo$: Observable<Student[]>= of([]);
    sortByProperty$: Observable<string> = of('class').pipe(startWith('class'));
    allStudentClassWise$: Observable<Student[]>;
    constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService, public firebaseService: FirebaseService, private router: Router, private store:Store<AppState>, private route: ActivatedRoute) {
        this.getStudentsFromStore()
        this.allStudentInfo$ = combineLatest([
            this.students$.pipe(filter(students => students !== null)), // Filtering out null values
            this.sortByProperty$.pipe(filter(property => property !== null)) // Filtering out null values
          ]).pipe(
            map(([students, sortByProperty]) => this.sortStudents(students, sortByProperty))
          );
        this.totalStudent$ = this.allStudentInfo$.pipe(
            map(students => students.filter(student => student['2024-2025'])),
            map(inStudent => inStudent.length)
          );
          this.allStudentClassWise$ = combineLatest([
            this.allStudentInfo$,
            this.sortByProperty$
          ]).pipe(
            filter(([students, _]) => students !== null), // Filtering out null values
            map(([students, property]) => {
              if (students === null) {
                // Handle the case where students array is null
                return []; // Or you can return some default value
              } else {
                return this.sortStudents(students, property);
              }
            })
          );
          
    }
 
    ngOnInit() {
        this.store.dispatch(loadStudents());
        const data = this.route.snapshot.data;
        this.title.set(data['title'])
 
        // this.students$.subscribe({
        //     next: (items: Student[]) => {
        //       let inStudent = items.filter((item) => (item['2024-2025']));
        //       this.totalStudent = inStudent.length;
        //       this.allStudentInfo = sortBy(inStudent, ['class', 'StudentName']);
        //       this.allStudentClassWise = this.sortStudent(this.sortByProperty);
        //       this.inSchoolStudentData = this.extractInschoolData();
        //       console.log(this.allStudentInfo);
        //       // this.generateAutoFeeStructure(this.inSchoolStudentData);
        //       this.loaded = true;
        //     },
        //     error: (err) => {
        //       this.loaded = false;
        //     }
        //   });


    }


    private sortStudents(students: Student[] | null, property: string): Student[] {
      if (!students) {
        return [];
      }
      // Use lodash groupBy to group students by the specified property
      const groupedStudents = groupBy(students, property);
      // Use lodash values to get an array of arrays of students
      const studentArrays = values(groupedStudents);
      // Use Array.prototype.concat to flatten the array of arrays into a single array
      return Array.prototype.concat(...studentArrays);
    }
    
      
      getStudentsFromStore() {
        // Dispatch action to load students
        this.totalStudent$ = this.store.select(selectTotalStudents);
        this.students$ = this.store.select(selectStudents);
        this.loaded$ = this.store.select(selectLoadedStatus);
      }
    sortStudent(property: any){
        this.sortByProperty = property
        return values(groupBy(this.allStudentInfo, property))
    }
    sortBy(property: any){
        this.sortByProperty = property
        this.allStudentClassWise = this.sortStudent(property)
    }
    extractInschoolData() {
        let filterData = this.allStudentClassWise.map(item => {
            return item.filter((innerItem: any) => {
                if (innerItem['Sub-Status'] == 'In School') {
                    return true;
                };
                return false
            })

        })
        return filterData;
    }
    public onInput() {
        const elements = document?.querySelector('.student-info')?.children;
        const items = Array.from(elements ?? []);
        this.itemsCount = 0;
        requestAnimationFrame(() => {
            items.forEach((item) => {
                Array.from(item.children).forEach((item: any) => {
                    const shouldShow = item.textContent.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
                    this.itemsCount = shouldShow ? this.itemsCount + 1 : this.itemsCount;
                    item['style'].display = shouldShow ? 'block' : 'none';
                })
            });

        });
    }
    public fetchUrl(url: any) {
        let imageUrl = this.storeService.getFbStorageURl(url).subscribe(item => {
            return item;
        });
        return imageUrl;
    }
    public async showModal(info: any) {
        const modal = await this.modalCtrl.create({
            component: ModalPage,
            cssClass: 'my-custom-class',
            componentProps: { info: info },
            canDismiss: true,
            presentingElement: await this.modalCtrl.getTop()
        });
        return await modal.present();
    }
    public showReport(std: any){
        this.router.navigate([`/report/${std.StudentName}`]);
    }
    generateAutoFeeStructure(data: any[]) {
        let flatData = data.flat(2);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let AutoFeeMonthwise = []
        months.forEach(month => {
            let studentInfoArray: any[] = []
            flatData.forEach(element => {
                let studentInfo = {
                    name: element.StudentName,
                    mobile: element.MobileNumber,
                    class: element.class,
                    FatherName: element.FatherName,
                    value: 0
                }
                studentInfoArray.push(studentInfo)
            });
           AutoFeeMonthwise.push({ month: month, studentInf: studentInfoArray })
        })

    }

}
