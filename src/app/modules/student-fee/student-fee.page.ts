import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { sortBy } from 'lodash';
import { FirebaseService } from '../../shared-service/firebaseService/firebase-service.service';
import { StudentDetailPage } from '../shared/student-detail/student-detail.page';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.page.html',
  styleUrls: ['./student-fee.page.scss'],
})
export class StudentFeePage implements OnInit {

  public allStudentInfo = []
  params: Params | undefined;
  allStudentClassWise: any[] =[];
  inSchoolStudentData: any[]=[];
  totalStudent: number=0;
  AutoFeeMonthwise: any[]=[];
  constructor(public modalCtrl: ModalController,public firebaseService:FirebaseService) { }

 

  ngOnInit() {
    this.firebaseService.getAllstudentFee('student-fee').subscribe(auto=>{
      let autoFee=auto;
      this.generateAutoFeeStructure(autoFee)
    })
  }
  extractInschoolData() {
    this.totalStudent = 0;
    let filterData = this.allStudentClassWise.map(item => {
      return item.filter((innerItem:any) => {
        if (innerItem.info['Sub-Status'] == 'In School') {
          this.totalStudent = this.totalStudent + 1;
          return true;
        };
        return false
      })

    })
    console.log(this.totalStudent)
    return filterData;
  }
  generateAutoFeeStructure(data: any) {
    let flatData = data;
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.AutoFeeMonthwise = []
    months.forEach(month => {
      let studentInfoArray: any[] = []
      flatData.forEach((element: any) => {
        let studentInfo = {
          name: element.StudentName,
          mobile:element.MobileNumber,
          class:element.class,
          image:element.Image,
          FatherName:element.FatherName,
          value: element[month]
        }
        studentInfoArray.push(studentInfo)
      });
      studentInfoArray=sortBy(studentInfoArray,['class','name'])
      this.AutoFeeMonthwise.push({month:month,studentInf:studentInfoArray})
    })
  }
  public async showModal(info: any) {
    let monthlyCollection: any[]=[]
    this.AutoFeeMonthwise.forEach(item=>{
      monthlyCollection.push({info:item.studentInf.find((o: any) => o.name === info),month:item.month});
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
}
