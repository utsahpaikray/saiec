import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, sortBy, uniq } from 'lodash';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared-service/auth-service.service';
import { ToasterService } from '../../shared-service/toaster.service';
import { ExamFormComponent } from './components/transaction-form/exam-form.component';
import { examdetail } from './exam-detail';
@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.page.html',
  styleUrls: ['./exam-form.page.scss'],
})
export class ExamFormPage implements OnInit {
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Halfly', 'Annual'];
  rowData: any;
  names: any;
  monthWiseData: any;
  @ViewChild('pdfTable', { read: ElementRef }) pdfTable: ElementRef | undefined;
  pdfOptions: any;
  workspaceService: any;
  selectedMonth = 'All';
  classList: any[] | undefined;
  examdetail = examdetail;
  filterData: any;
  selectedStudentInfo: any;
  editInfo: any;
  nonAcademicForm!: FormGroup;
  subscription!: Subscription;
  isAuthorized = false;
  formValue: any;
  constructor(public modalCtrl: ModalController, public firebaseService: FirebaseService, private authService: AuthService,  private toasterService:ToasterService) { }

  ngOnInit() {
   // this.addStudentRecord();
    this.getStudent();
    this.isAuthorized = this.authService.isAuthorizedUser;
  }

  getStudent() {
    this.subscription = this.firebaseService.getAllExamInfo().subscribe(items => {
      this.rowData = items;
      console.log(this.rowData)
      // this.rowData.forEach(studentInfo => {
      // if(studentInfo.class== 'Nursery' || studentInfo.class== 'KG'){
      //     studentInfo.markInfo.forEach(mark => {
      //       if(mark.name==="Halfly" || mark.name==="Annual"){
      //        // console.log(mark.marks.findIndex(item=>item.sub=='G.K'))
      //         if(mark.marks.findIndex(item=>item.sub=='G.K')==-1){
      //           //this.removeSubject(mark.marks,'GK')
      //          let result = this.addSubject(mark.marks,'G.K');
      //           // console.log(result)
      //           console.log(studentInfo)
      //           this.firebaseService.updateExamInfo(studentInfo.$id, studentInfo);
      //         }
      //        // 
             
      //       // 
      //       }
      //     });
      //   }

      // });
      this.classList = sortBy(uniq(map(items, 'class')))
    })
  }
  removeSubject(marks:[],topic: any){
    this.subscription.unsubscribe();
    let index= marks.findIndex(item=>{return item['sub']==topic})
    console.log(index)
    if (index > -1){
      marks.splice(index,1);
      //console.log(marks)
    }
   return marks;
  }
  addSubject(marks: { writtenTotal: number; sub: any; oralAcc: number; year: string; oral: number; writtenAcc: number; subjectTotal: number; acc: number; total: number; }[],topic: any) {
    this.subscription.unsubscribe();
    let subject = {
      "writtenTotal": 0,
      "sub": topic,
      "oralAcc": 0,
      "year": "2022-2023",
      "oral": 0,
      "writtenAcc": 0,
      "subjectTotal": 0,
      "acc": 0,
      "total": 0
    }
    return marks.push(subject);
  }
  selectStd(value: any) {
    this.filterData = this.rowData.filter((item: { class: any; }) => {
      return item.class == value;
    })
    this.names = map(this.filterData, 'name');
  }
  selectStudent(value: any) {
    this.selectedStudentInfo = this.filterData.filter((item: { name: any; }) => {
      return item.name == value;
    })[0]
    this.selectedStudentInfo.markInfo.map((item: { visible: boolean; name: string; }) => {
      if (this.selectedMonth == "All") {
        item.visible = true;
      } else if (item.name == this.selectedMonth) {
        item.visible = true;
      } else {
        item.visible = false;
      }
      return item;
    })
    this.selectedStudentInfo.markInfo = this.sortByMonth(this.selectedStudentInfo.markInfo)
  }
  selectMonth(value: string) {
    this.selectedMonth = value;
    if (this.selectedStudentInfo) {
      this.selectedStudentInfo.markInfo.map((item: { visible: boolean; name: string; }) => {
        if (this.selectedMonth == "All") {
          item.visible = true;
        } else if (item.name == this.selectedMonth) {
          item.visible = true;
        } else {
          item.visible = false;
        }
        return item;
      })
      this.selectedStudentInfo.markInfo = this.sortByMonth(this.selectedStudentInfo.markInfo)
    }


  }
  sortByMonth(arr: any[]) {

    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return arr.sort(function (a: { name: string; }, b: { name: string; }) {
      return months.indexOf(a.name)
        - months.indexOf(b.name);
    });
  }

  public async showModal(info: string, monthData: { name: any; }) {
    this.editInfo = info;
    const modal = await this.modalCtrl.create({
      component: ExamFormComponent,
      cssClass: 'my-custom-class',
      componentProps: { info: this.editInfo },
      canDismiss: true,
      mode: 'ios'
    });

    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.selectedStudentInfo.markInfo.forEach((items: { name: any; marks: any[]; }) => {
        if (items.name == monthData.name) {
          items.marks.forEach((item: { sub: any; oral: any; oralAcc: any; writtenTotal: any; writtenAcc: any; subjectTotal: number; total: number; }) => {
            if (item.sub == info.sub) {
              item.oral = data.oralTotal;
              item.oralAcc = data.oralAcc;
              item.writtenTotal = data.writtenTotal;
              item.writtenAcc = data.writtenAcc;
              item.subjectTotal = Number(data.oralTotal) + Number(data.writtenTotal);
              item.total = Number(data.oralAcc) + Number(data.writtenAcc);
            }
          });
        }
      });
      console.log(this.selectedStudentInfo);
      this.firebaseService.updateExamInfo(this.selectedStudentInfo.$id, this.selectedStudentInfo);
    }

  }
  formValueOutput(formValue: any) {
    this.formValue = formValue;
  }
  save(monthData: any) {
   // console.log(this.formValue);
   // if(this.formValue || this.formValue?.mode==monthData){
    this.selectedStudentInfo.markInfo.forEach((items: { [x: string]: any; name: any; }) => {
      if (items.name == this.formValue.mode) {
        items['nonAcademic'] = this.formValue.value;
      }
    })
    this.firebaseService.updateExamInfo(this.selectedStudentInfo.$id, this.selectedStudentInfo);
    this.toasterService.presentToast(`Succesfull update for ${monthData}`,2000)
  //}else{
  //  this.toasterService.presentToast(`Not able to update for ${monthData}`,2000)
  //}
  }
  addStudentRecord() {
    let data={
      "class": "KG",
      "name": "Sanskriti Raut",
      "markInfo": [
          {
              "name": "Halfly",
              "marks": [
                  {
                      "writtenAcc": "30",
                      "sub": "MIL(Odia)",
                      "oral": "10",
                      "acc": 0,
                      "oralAcc": "8",
                      "year": "2022-2023",
                      "total": 38,
                      "subjectTotal": 50,
                      "writtenTotal": "40"
                  },
                  {
                      "sub": "Math",
                      "subjectTotal": 50,
                      "oral": "10",
                      "oralAcc": "9",
                      "acc": 0,
                      "total": 47,
                      "writtenAcc": "38",
                      "year": "2022-2023",
                      "writtenTotal": "40"
                  },
                  {
                      "oralAcc": "22",
                      "oral": "25",
                      "year": "2022-2023",
                      "writtenAcc": 0,
                      "subjectTotal": 25,
                      "sub": "Science",
                      "total": 22,
                      "acc": 0,
                      "writtenTotal": "0"
                  },
                  {
                      "oral": "10",
                      "writtenAcc": "34.5",
                      "subjectTotal": 50,
                      "writtenTotal": "40",
                      "acc": 0,
                      "sub": "English",
                      "total": 44.5,
                      "year": "2022-2023",
                      "oralAcc": "10"
                  },
                  {
                      "sub": "Drawing",
                      "acc": 0,
                      "oralAcc": 0,
                      "oral": 0,
                      "year": "2022-2023",
                      "writtenAcc": "39",
                      "subjectTotal": 50,
                      "total": 39,
                      "writtenTotal": "50"
                  },
                  {
                      "acc": 0,
                      "writtenTotal": 0,
                      "sub": "G.K",
                      "total": 20,
                      "year": "2022-2023",
                      "oralAcc": "20",
                      "subjectTotal": 25,
                      "oral": "25",
                      "writtenAcc": 0
                  }
              ],
              "visible": true,
              "nonAcademic": {
                  "creativity": "A+",
                  "gardening": "B+",
                  "physicalEdu": "A+",
                  "senseDev": "A+",
                  "handWork": "A+",
                  "musicalDance": "A+",
                  "remark": "Good"
              }
          },
          {
              "visible": false,
              "name": "Annual",
              "marks": [
                  {
                      "acc": 0,
                      "sub": "Math",
                      "oralAcc": 0,
                      "oral": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "total": 0
                  },
                  {
                      "acc": 0,
                      "total": 0,
                      "oralAcc": 0,
                      "sub": "English",
                      "year": "2022-2023",
                      "subjectTotal": 0,
                      "oral": 0,
                      "writtenAcc": 0
                  },
                  {
                      "oral": 0,
                      "subjectTotal": 0,
                      "total": 0,
                      "oralAcc": 0,
                      "sub": "Science",
                      "acc": 0,
                      "year": "2022-2023",
                      "writtenAcc": 0
                  },
                  {
                      "writtenAcc": 0,
                      "acc": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "sub": "MIL(Odia)",
                      "oral": 0,
                      "total": 0,
                      "oralAcc": 0
                  },
                  {
                      "total": 0,
                      "oralAcc": 0,
                      "acc": 0,
                      "year": "2022-2023",
                      "writtenTotal": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "sub": "Drawing",
                      "oral": 0
                  },
                  {
                      "oralAcc": 0,
                      "sub": "G.K",
                      "year": "2022-2023",
                      "total": 0,
                      "oral": 0,
                      "writtenTotal": 0,
                      "acc": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0
                  }
              ]
          },
          {
              "name": "January",
              "marks": [
                  {
                      "oral": 0,
                      "total": 0,
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "sub": "Math",
                      "acc": 0,
                      "year": "2022-2023",
                      "oralAcc": 0
                  },
                  {
                      "oralAcc": 0,
                      "oral": 0,
                      "year": "2022-2023",
                      "writtenAcc": 0,
                      "total": 0,
                      "acc": 0,
                      "sub": "English",
                      "subjectTotal": 0
                  },
                  {
                      "oral": 0,
                      "total": 0,
                      "acc": 0,
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "sub": "Science",
                      "subjectTotal": 0,
                      "oralAcc": 0
                  },
                  {
                      "sub": "MIL(Odia)",
                      "year": "2022-2023",
                      "total": 0,
                      "oralAcc": 0,
                      "writtenAcc": 0,
                      "acc": 0,
                      "oral": 0,
                      "subjectTotal": 0
                  }
              ],
              "visible": false
          },
          {
              "name": "February",
              "visible": false,
              "marks": [
                  {
                      "oral": 0,
                      "total": 0,
                      "year": "2022-2023",
                      "oralAcc": 0,
                      "acc": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "sub": "Science"
                  },
                  {
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "subjectTotal": 0,
                      "oral": 0,
                      "oralAcc": 0,
                      "total": 0,
                      "acc": 0,
                      "sub": "MIL(Odia)"
                  },
                  {
                      "total": 0,
                      "writtenAcc": 0,
                      "acc": 0,
                      "year": "2022-2023",
                      "sub": "Math",
                      "oralAcc": 0,
                      "oral": 0,
                      "subjectTotal": 0
                  },
                  {
                      "sub": "English",
                      "oral": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "acc": 0,
                      "subjectTotal": 0,
                      "oralAcc": 0,
                      "year": "2022-2023"
                  }
              ]
          },
          {
              "name": "March",
              "marks": [
                  {
                      "writtenAcc": 0,
                      "total": 0,
                      "acc": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "oralAcc": 0,
                      "sub": "English",
                      "oral": 0
                  },
                  {
                      "year": "2022-2023",
                      "writtenAcc": 0,
                      "oral": 0,
                      "sub": "Math",
                      "oralAcc": 0,
                      "total": 0,
                      "acc": 0,
                      "subjectTotal": 0
                  },
                  {
                      "sub": "MIL(Odia)",
                      "acc": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "oral": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "oralAcc": 0
                  },
                  {
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "acc": 0,
                      "year": "2022-2023",
                      "total": 0,
                      "sub": "Science",
                      "oralAcc": 0,
                      "oral": 0
                  }
              ],
              "visible": false
          },
          {
              "visible": false,
              "marks": [
                  {
                      "oral": 0,
                      "writtenAcc": 0,
                      "total": 0,
                      "subjectTotal": 0,
                      "sub": "English",
                      "oralAcc": 0,
                      "acc": 0,
                      "year": "2022-2023"
                  },
                  {
                      "year": "2022-2023",
                      "writtenAcc": 0,
                      "total": 0,
                      "acc": 0,
                      "oral": 0,
                      "oralAcc": 0,
                      "subjectTotal": 0,
                      "sub": "MIL(Odia)"
                  },
                  {
                      "oralAcc": 0,
                      "sub": "Math",
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "total": 0,
                      "oral": 0,
                      "acc": 0
                  },
                  {
                      "total": 0,
                      "acc": 0,
                      "oral": 0,
                      "writtenAcc": 0,
                      "oralAcc": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "sub": "Science"
                  }
              ],
              "name": "April"
          },
          {
              "marks": [
                  {
                      "oralAcc": 0,
                      "acc": 0,
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "oral": 0,
                      "total": 0,
                      "sub": "Science"
                  },
                  {
                      "writtenAcc": 0,
                      "oralAcc": 0,
                      "acc": 0,
                      "sub": "Math",
                      "year": "2022-2023",
                      "oral": 0,
                      "total": 0,
                      "subjectTotal": 0
                  },
                  {
                      "acc": 0,
                      "oralAcc": 0,
                      "year": "2022-2023",
                      "sub": "English",
                      "subjectTotal": 0,
                      "total": 0,
                      "oral": 0,
                      "writtenAcc": 0
                  },
                  {
                      "oralAcc": 0,
                      "writtenAcc": 0,
                      "acc": 0,
                      "year": "2022-2023",
                      "subjectTotal": 0,
                      "oral": 0,
                      "total": 0,
                      "sub": "MIL(Odia)"
                  }
              ],
              "name": "May",
              "visible": false
          },
          {
              "visible": false,
              "name": "June",
              "marks": [
                  {
                      "sub": "MIL(Odia)",
                      "year": "2022-2023",
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "total": 0,
                      "oral": 0,
                      "oralAcc": 0,
                      "acc": 0
                  },
                  {
                      "acc": 0,
                      "writtenAcc": 0,
                      "oral": 0,
                      "oralAcc": 0,
                      "total": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "sub": "Math"
                  },
                  {
                      "year": "2022-2023",
                      "sub": "Science",
                      "writtenAcc": 0,
                      "oral": 0,
                      "subjectTotal": 0,
                      "total": 0,
                      "oralAcc": 0,
                      "acc": 0
                  },
                  {
                      "acc": 0,
                      "total": 0,
                      "oralAcc": 0,
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "sub": "English",
                      "oral": 0,
                      "year": "2022-2023"
                  }
              ]
          },
          {
              "name": "July",
              "visible": false,
              "marks": [
                  {
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "total": 0,
                      "year": "2022-2023",
                      "sub": "MIL(Odia)",
                      "acc": 0,
                      "oral": 0,
                      "oralAcc": 0
                  },
                  {
                      "subjectTotal": 0,
                      "oral": 0,
                      "writtenAcc": 0,
                      "oralAcc": 0,
                      "sub": "Science",
                      "acc": 0,
                      "total": 0,
                      "year": "2022-2023"
                  },
                  {
                      "oral": 0,
                      "writtenAcc": 0,
                      "sub": "Math",
                      "total": 0,
                      "acc": 0,
                      "oralAcc": 0,
                      "year": "2022-2023",
                      "subjectTotal": 0
                  },
                  {
                      "writtenAcc": 0,
                      "sub": "English",
                      "acc": 0,
                      "oralAcc": 0,
                      "subjectTotal": 0,
                      "oral": 0,
                      "total": 0,
                      "year": "2022-2023"
                  }
              ]
          },
          {
              "marks": [
                  {
                      "oralAcc": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "acc": 0,
                      "sub": "English",
                      "oral": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023"
                  },
                  {
                      "year": "2022-2023",
                      "total": 0,
                      "sub": "Science",
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "oralAcc": 0,
                      "oral": 0,
                      "acc": 0
                  },
                  {
                      "acc": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "total": 0,
                      "oralAcc": 0,
                      "sub": "Math",
                      "oral": 0,
                      "year": "2022-2023"
                  },
                  {
                      "acc": 0,
                      "oralAcc": 0,
                      "oral": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "sub": "MIL(Odia)",
                      "subjectTotal": 0
                  }
              ],
              "name": "August",
              "visible": false
          },
          {
              "visible": false,
              "name": "September",
              "marks": [
                  {
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "sub": "English",
                      "acc": 0,
                      "writtenAcc": 0,
                      "oral": 0,
                      "oralAcc": 0,
                      "total": 0
                  },
                  {
                      "oralAcc": 0,
                      "oral": 0,
                      "acc": 0,
                      "year": "2022-2023",
                      "total": 0,
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "sub": "Science"
                  },
                  {
                      "acc": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "sub": "MIL(Odia)",
                      "oral": 0,
                      "total": 0,
                      "year": "2022-2023",
                      "oralAcc": 0
                  },
                  {
                      "acc": 0,
                      "subjectTotal": 0,
                      "oralAcc": 0,
                      "total": 0,
                      "year": "2022-2023",
                      "oral": 0,
                      "writtenAcc": 0,
                      "sub": "Math"
                  }
              ]
          },
          {
              "marks": [
                  {
                      "subjectTotal": 0,
                      "sub": "MIL(Odia)",
                      "acc": 0,
                      "year": "2022-2023",
                      "writtenAcc": 0,
                      "oralAcc": 0,
                      "total": 0,
                      "oral": 0
                  },
                  {
                      "oralAcc": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "oral": 0,
                      "subjectTotal": 0,
                      "acc": 0,
                      "year": "2022-2023",
                      "sub": "Science"
                  },
                  {
                      "oralAcc": 0,
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "writtenAcc": 0,
                      "total": 0,
                      "oral": 0,
                      "acc": 0,
                      "sub": "Math"
                  },
                  {
                      "sub": "English",
                      "total": 0,
                      "oralAcc": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "oral": 0,
                      "acc": 0,
                      "year": "2022-2023"
                  }
              ],
              "name": "October",
              "visible": false
          },
          {
              "marks": [
                  {
                      "subjectTotal": 0,
                      "year": "2022-2023",
                      "oral": 0,
                      "acc": 0,
                      "total": 0,
                      "sub": "MIL(Odia)",
                      "writtenAcc": 0,
                      "oralAcc": 0
                  },
                  {
                      "acc": 0,
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "oral": 0,
                      "subjectTotal": 0,
                      "sub": "Science",
                      "total": 0,
                      "oralAcc": 0
                  },
                  {
                      "oralAcc": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "subjectTotal": 0,
                      "acc": 0,
                      "sub": "Math",
                      "year": "2022-2023",
                      "oral": 0
                  },
                  {
                      "year": "2022-2023",
                      "total": 0,
                      "subjectTotal": 0,
                      "sub": "English",
                      "acc": 0,
                      "oral": 0,
                      "writtenAcc": 0,
                      "oralAcc": 0
                  }
              ],
              "name": "November",
              "visible": false
          },
          {
              "name": "December",
              "visible": false,
              "marks": [
                  {
                      "oral": 0,
                      "writtenAcc": 0,
                      "sub": "MIL(Odia)",
                      "subjectTotal": 0,
                      "oralAcc": 0,
                      "total": 0,
                      "acc": 0,
                      "year": "2022-2023"
                  },
                  {
                      "oralAcc": 0,
                      "sub": "Math",
                      "year": "2022-2023",
                      "oral": 0,
                      "acc": 0,
                      "subjectTotal": 0,
                      "total": 0,
                      "writtenAcc": 0
                  },
                  {
                      "subjectTotal": 0,
                      "writtenAcc": 0,
                      "oralAcc": 0,
                      "oral": 0,
                      "acc": 0,
                      "sub": "English",
                      "year": "2022-2023",
                      "total": 0
                  },
                  {
                      "subjectTotal": 0,
                      "oralAcc": 0,
                      "acc": 0,
                      "oral": 0,
                      "total": 0,
                      "writtenAcc": 0,
                      "year": "2022-2023",
                      "sub": "Science"
                  }
              ]
          }
      ]
  }
    this.firebaseService.pushItems('examInfo', data)
  }
}

