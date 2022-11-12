import { ModalController, ToastController } from '@ionic/angular';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { groupBy, keys, orderBy, flattenDeep, map, uniq, sortBy } from 'lodash'
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
import { examdetail } from './exam-detail'
import { ExamFormComponent } from './components/transaction-form/exam-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared-service/auth-service.service';
import { ToasterService } from 'src/app/shared-service/toaster.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
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
  @ViewChild('pdfTable', { read: ElementRef }) pdfTable: ElementRef;
  pdfOptions: any;
  workspaceService: any;
  selectedMonth = 'All';
  classList = [];
  examdetail = examdetail;
  filterData: any;
  selectedStudentInfo: any;
  editInfo: any;
  nonAcademicForm: FormGroup;
  subscription: Subscription;
  isAuthorized = false;
  formValue: any;
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService, public firebaseService: FirebaseService, private authService: AuthService,  private toasterService:ToasterService) { }

  ngOnInit() {
    this.getStudent();
    this.isAuthorized = this.authService.isAuthorizedUser
  }

  getStudent() {
    this.subscription = this.firebaseService.getAllExamInfo().subscribe(items => {
      this.rowData = items;
      // this.rowData.forEach(studentInfo => {
      // //  if(studentInfo.class!== 'Nursery' && studentInfo.class!== "KG"){
      //     studentInfo.markInfo.forEach(mark => {
      //       if(mark.name==="Halfly" || mark.name==="Annual"){
      //         console.log(mark.marks.findIndex(item=>item.sub=='Drawing'))
      //         // if(mark.marks.findIndex(item=>item.sub=='Drawing')==-1){
      //         //   let result = this.addSubject(mark.marks);

      //         //  this.firebaseService.updateExamInfo(studentInfo.$id, studentInfo);
      //         // }
      //        // 
      //        console.log(studentInfo.name)
      //       // 
      //       }
      //     });
      //   //}

      // });
      this.classList = sortBy(uniq(map(items, 'class')))
    })
  }
  addSubject(marks) {
    this.subscription.unsubscribe();
    let subject = {
      "writtenTotal": 0,
      "sub": "Drawing",
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
  selectStd(value) {
    this.filterData = this.rowData.filter(item => {
      return item.class == value;
    })
    this.names = map(this.filterData, 'name');
  }
  selectStudent(value) {
    this.selectedStudentInfo = this.filterData.filter(item => {
      return item.name == value;
    })[0]
    this.selectedStudentInfo.markInfo.map(item => {
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
  selectMonth(value) {
    this.selectedMonth = value;
    if (this.selectedStudentInfo) {
      this.selectedStudentInfo.markInfo.map(item => {
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
  sortByMonth(arr) {

    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return arr.sort(function (a, b) {
      return months.indexOf(a.name)
        - months.indexOf(b.name);
    });
  }

  exportAllToPDF(pages: HTMLElement) {
    const doc = new jsPDF({
      unit: 'px',
      format: 'A4'
    });

    doc.html(pages, {
      callback: (doc: jsPDF) => {
        doc.deletePage(doc.getNumberOfPages());
        doc.save('pdf-export');
      }
    });
  }
  public async showModal(info, monthData) {
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
      this.selectedStudentInfo.markInfo.forEach(items => {
        if (items.name == monthData.name) {
          items.marks.forEach(item => {
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
      this.firebaseService.updateExamInfo(this.selectedStudentInfo.$id, this.selectedStudentInfo);
    }

  }
  formValueOutput(formValue) {
    this.formValue = formValue;
  }
  save(monthData) {
    console.log(this.formValue);
    if(this.formValue.mode==monthData){
    this.selectedStudentInfo.markInfo.forEach(items => {
      if (items.name == this.formValue.mode) {
        items['nonAcademic'] = this.formValue.value;
      }
    })
    this.firebaseService.updateExamInfo(this.selectedStudentInfo.$id, this.selectedStudentInfo);
    this.toasterService.presentToast(`Succesfull update for ${monthData}`,2000)
  }else{
    this.toasterService.presentToast(`Not able to update for ${monthData}`,2000)
  }
  }
}

