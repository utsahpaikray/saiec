import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { allStudentInfo } from '../../../assets/student-info/allStudentInfo';
import { groupBy, values } from 'lodash';
import { StudentDetailPage } from '../shared/student-detail/student-detail.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-autofee',
  templateUrl: './autofee.page.html',
  styleUrls: ['./autofee.page.scss'],
})
export class AutofeePage implements OnInit {
  public allStudentInfo = allStudentInfo;
  params: Params;
  allStudentClassWise: any[];
  inSchoolStudentData: any[];
  totalStudent: number;
  AutoFeeMonthwise: any[];
  constructor(private route: ActivatedRoute,public modalCtrl: ModalController) { }

  ngOnInit() {
    this.allStudentClassWise = values(groupBy(this.allStudentInfo, 'info.class'))
    this.params = this.route.snapshot.params;
    this.inSchoolStudentData = this.extractInschoolData();
    this.generateAutoFeeStructure(this.inSchoolStudentData)
  }
  extractInschoolData() {
    this.totalStudent = 0;
    let filterData = this.allStudentClassWise.map(item => {
      return item.filter(innerItem => {
        if (innerItem.info['Sub-Status'] == 'In School') {
          this.totalStudent = this.totalStudent + 1;
          return true;
        };
      })

    })
    console.log(this.totalStudent)
    return filterData;
  }
  generateAutoFeeStructure(data) {
    console.log(data.flat(2))
    let flatData = data.flat(2);
    let months = ['January', 'Februaru', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.AutoFeeMonthwise = []
    months.forEach(month => {
      let studentInfoArray = []
      flatData.forEach(element => {
        let studentInfo = {
          name: element.info.StudentName,
          mobile:element.info.MobileNumber,
          class:element.info.class,
          image:element.info.Image,
          FatherName:element.info.FatherName,
          value: 0
        }
        studentInfoArray.push(studentInfo)
      });
    this.AutoFeeMonthwise.push({month:month,studentInf:studentInfoArray})
    })
console.log(this.AutoFeeMonthwise)

  }
  public async showModal(info) {
    console.log(info)
    let monthlyCollection=[]
    this.AutoFeeMonthwise.forEach(item=>{
      monthlyCollection.push({info:item.studentInf.find(o => o.name === info),month:item.month});
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
