import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { sortBy } from 'lodash';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { StudentDetailPage } from '../shared/student-detail/student-detail.page';
@Component({
  selector: 'app-autofee',
  templateUrl: './autofee.page.html',
  styleUrls: ['./autofee.page.scss'],
})
export class AutofeePage implements OnInit {
  public allStudentInfo = [];
  params: Params | undefined;
  allStudentClassWise: any[] | undefined;
  inSchoolStudentData: any[] | undefined;
  totalStudent: number = 0;
  AutoFeeMonthwise: any[] = [];
  session = '24-25';
  filterData!: any[];
  constructor(private route: ActivatedRoute,public modalCtrl: ModalController,public firebaseService:FirebaseService) { }

 

  ngOnInit() {
    this.firebaseService.getAllstudentFee('student-auto-fee').subscribe(auto=>{
      this.generateAutoFeeStructure(auto)
    })
  }
  private extractInschoolData() {
    this.totalStudent = 0;
    let filterData = this.allStudentClassWise?.map(item => {
      return item.filter((innerItem: any) => {
        if (innerItem.info['Sub-Status'] == 'In School') {
          this.totalStudent = this.totalStudent + 1;
          return true;
        };
        return false
      })

    })
    return filterData;
  }
  generateAutoFeeStructure(data: { $id: string; }[]) {
    let flatData = data;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.AutoFeeMonthwise = []
    months.forEach(month => {
      let studentInfoArray: { name: any; mobile: any; class: any; image: any; FatherName: any; value: any; }[] = []
      flatData.forEach((element: any) => {
        let studentInfo = {
          name: element.StudentName,
          mobile:element.MobileNumber,
          class:element.class,
          image:element.Image,
          FatherName:element.FatherName,
          value: element[month],
          autoSession: element.autoSession
        }
        studentInfoArray.push(studentInfo)
      });
      studentInfoArray=sortBy(studentInfoArray,['class','name'])
      this.AutoFeeMonthwise.push({month:month,studentInf:studentInfoArray})
      this.filterData = [...this.AutoFeeMonthwise];
    })
  }
  public async showModal(info: any) {
    let monthlyCollection: { info: any; month: any; }[]=[]
    this.AutoFeeMonthwise.forEach(item=>{
      monthlyCollection.push({info:item.studentInf.find((o: { name: any; }) => o.name === info),month:item.month});
    })
    const modal = await this.modalCtrl.create({
      component: StudentDetailPage,
      cssClass: 'my-custom-class',
      componentProps: { info: monthlyCollection },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
  selectSession(value: string) {
    this.session = value;

    // Filter the AutoFeeMonthwise to get items where any studentInf matches the session
    this.filterData = this.AutoFeeMonthwise.filter((item: any) => {
      return item.studentInf.some((student: any) => student.autoSession === value);
    });

    // Extract matching studentInf items from the filtered items
    this.filterData = this.filterData.map((item: any) => {
      return {
        ...item,
        studentInf: item.studentInf.filter((student: any) => student.autoSession === value)
      };
    });
  }

}
