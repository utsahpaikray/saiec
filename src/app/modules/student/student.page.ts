import { Component, OnInit } from '@angular/core';
import { std7 } from './../../../assets/student-info/standard7';
import { std6 } from './../../../assets/student-info/standard6';
import { std5 } from './../../../assets/student-info/standard5';
import { std4 } from './../../../assets/student-info/standard4';
import { std3 } from './../../../assets/student-info/standard3';
import { pioneer } from '../../../assets/student-info/pioneer';
import { allStudentInfo } from '../../../assets/student-info/allStudentInfo'

import * as XLSX from 'xlsx'
import { groupBy, values } from 'lodash';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../shared/modal/modal.page';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public allStudentInfo;
  public gridValue: boolean = false;
  searchQuery: any;
  allStudent: any[];
  itemsCount: number = 1;
  allStudentClassWise: any[];
  inSchoolStudentData: any[];
  totalStudent: number;
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService,public firebaseService:FirebaseService) {
  }

  ngOnInit() {
    this.firebaseService.getAllstudent().subscribe(items=>{
        console.log(items)
         this.allStudentInfo = items;
         this.allStudentClassWise = values(groupBy(this.allStudentInfo, 'class'))
         this.inSchoolStudentData = this.extractInschoolData();
         this.generateAutoFeeStructure(this.inSchoolStudentData)
      })
   

  }
  extractInschoolData() {
    this.totalStudent = 0;
    let filterData = this.allStudentClassWise.map(item => {
      console.log(item)
      return item.filter(innerItem => {
        innerItem['exmaDetail']= 
        [
          {
              "month": "Jan",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "Feb",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "Mar",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "April",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "May",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "jun",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "july",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "Aug",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "September",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "Oct",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "November",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },
          {
              "month": "December",
              "Subject": [
                  {
                      topic: 'Math',
                      total: 25,
                      occ: 20
                  },
                  {
                      topic: 'Science',
                      total: 25,
                      occ: 19
                  },
                  {
                      topic: 'English',
                      total: 25,
                      occ: 15

                  },
                  {
                      topic: 'MIL(Odia)',
                      total: 25,
                      occ: 10

                  },
                  {
                      topic: 'History',
                      total: 25,
                      occ: 12
                  },
              ],
          },]
        if (innerItem['Sub-Status'] == 'In School') {
          this.totalStudent = this.totalStudent + 1;
          return true;
        };
      })

    })
    return filterData;
  }
  public onInput() {
    const items = Array.from(document.querySelector('.student-info').children);
    this.itemsCount = 0;
    requestAnimationFrame(() => {
      items.forEach((item) => {
        Array.from(item.children).forEach((item) => {
          const shouldShow = item.textContent.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
          this.itemsCount = shouldShow ? this.itemsCount + 1 : this.itemsCount;
          item['style'].display = shouldShow ? 'block' : 'none';
        })
      });

    });
  }
  public fetchUrl(url) {
    let imageUrl = this.storeService.getFbStorageURl(url).subscribe(item => {
      return item;
    });
    return imageUrl;
  }
  public async showModal(info) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: { info: info },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
  generateAutoFeeStructure(data) {
    console.log(data.flat(2))
    let flatData = data.flat(2);
    let months = ['January', 'Februaru', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let AutoFeeMonthwise = []
    months.forEach(month => {
      let studentInfoArray = []
      flatData.forEach(element => {
        let studentInfo = {
          name: element.StudentName,
          mobile:element.MobileNumber,
          class:element.class,
          FatherName:element.FatherName,
          value: 0
        }
        studentInfoArray.push(studentInfo)
      });
    AutoFeeMonthwise.push({month:month,studentInf:studentInfoArray})
    })
console.log(AutoFeeMonthwise)

  }

}
