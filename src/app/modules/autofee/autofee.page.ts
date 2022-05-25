import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { allStudentInfo } from '../../../assets/student-info/allStudentInfo';
import { groupBy, values } from 'lodash';
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
  constructor(private route: ActivatedRoute) { }

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
}
