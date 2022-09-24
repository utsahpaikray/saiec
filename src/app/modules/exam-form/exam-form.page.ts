import { ModalController } from '@ionic/angular';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { groupBy, keys, orderBy,flattenDeep,map,uniq,sortBy } from 'lodash'
import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
import { examdetail } from './exam-detail'
import { ExamFormComponent } from './components/transaction-form/exam-form.component';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.page.html',
  styleUrls: ['./exam-form.page.scss'],
})
export class ExamFormPage implements OnInit {
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','Halfly','Annual'];
  rowData: any;
  names: any;
  monthWiseData: any;
  @ViewChild('pdfTable', { read: ElementRef }) pdfTable:ElementRef;
  pdfOptions: any;
  workspaceService: any;
  selectedMonth='All';
  classList=[];
  examdetail=examdetail;
  filterData: any;
  selectedStudentInfo: any;
  editInfo: any;
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getStudent();
  }

  getStudent() {
    this.firebaseService.getAllExamInfo().subscribe(items => {
      console.log(items);
      this.rowData=items
      //this.rowData = groupBy(items, 'name');
      console.log(this.rowData)
      
      this.classList= sortBy(uniq(map(items,'class')))
  // let items=this.examdetail;
  //     console.log(items);
  //     this.rowData = groupBy(items, 'studentName');
  //     let result = Object.keys(this.rowData).map((key) => [{name:key, class:this.rowData[key][0].class,markInfo:this.rowData[key]}]);
  //     flattenDeep(result.forEach(element => {
  //       let info=groupBy(element[0].markInfo, 'month');
  //       element[0].markInfo= flattenDeep(Object.keys(info).map((key) => [{name:key,marks:info[key]}]))
  //     }));
  //     flattenDeep(result.forEach(items=>{
  //       items[0]['markInfo'].forEach(item=>{
  //         item.marks.forEach(mark => {
  //           mark.oralAcc= 0;
  //           mark.total= 0;
  //           mark.writtenAcc= 0;
  //           mark.sub= mark.sub;
  //           mark.subjectTotal= 0;
  //           mark.acc= 0;
  //           mark.oral= 0;
  //           mark.year= "2022-2023";
  //           delete  mark.studentName;
  //           delete  mark.class;
  //           delete  mark.$id;
  //           delete  mark.month;
  //           delete  mark.mobileNumber;

  //         });
  //       })
  //     }))
  //     console.log((result))
  //     let finalInfo=flattenDeep(result);
  //     console.log(finalInfo)
  //     finalInfo.forEach(item=>{
  //       this.firebaseService.pushItems('examInfo',item)
  //     })
      //this.names = keys(flattenDeep(result))
})
  }
  selectStd(value){
this.filterData=this.rowData.filter(item=>{
  return item.class==value;
})
this.names=map(this.filterData,'name');
  }
  selectStudent(value) {
this.selectedStudentInfo=this.filterData.filter(item=>{
  return item.name==value;
})[0]
this.selectedStudentInfo.markInfo.map(item=>{
    if(this.selectedMonth=="All"){
      item.visible=true;
    }else if(item.name==this.selectedMonth){
      item.visible=true;
    }else{
      item.visible=false;
    }  
    return item;
  })
  this.selectedStudentInfo.markInfo=this.sortByMonth(this.selectedStudentInfo.markInfo)
  }
  selectMonth(value) {
    this.selectedMonth=value;
    if(this.selectedStudentInfo){
      this.selectedStudentInfo.markInfo.map(item=>{
        if( this.selectedMonth=="All"){
          item.visible=true;
        }else if(item.name== this.selectedMonth){
          item.visible=true;
        }else{
          item.visible=false;
        }  
        return item;
     })
     this.selectedStudentInfo.markInfo=this.sortByMonth(this.selectedStudentInfo.markInfo)
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
      format:'A4'
    });

    doc.html(pages, {
      callback: (doc: jsPDF) => {
        doc.deletePage(doc.getNumberOfPages());
        doc.save('pdf-export');
      }
    });
  }
  onConfirm() {
    const pages = document.querySelector('.all-pages') as HTMLElement;
    this.exportAllToPDF(pages);
}
public async showModal(info,monthData) {
  this.editInfo=info;
  const modal = await this.modalCtrl.create({
    component: ExamFormComponent,
    cssClass: 'my-custom-class',
    componentProps: { info:this.editInfo },
    canDismiss: true,
    mode: 'ios'
  });

modal.present();
 const { data, role } = await modal.onWillDismiss();
 if (role === 'confirm') {
   this.selectedStudentInfo.markInfo.forEach(items => {
    if(items.name==monthData.name){
      items.marks.forEach(item => {
        if(item.sub==info.sub){
          item.oral=data.oralTotal;
          item.oralAcc=data.oralAcc;
          item.writtenTotal=data.writtenTotal;
          item.writtenAcc=data.writtenAcc;
          item.subjectTotal=Number(data.oralTotal)+Number(data.writtenTotal);
          item.total=Number(data.oralAcc)+Number(data.writtenAcc);
        }
      });
    }
   });
   console.log(this.selectedStudentInfo)
this.firebaseService.updateExamInfo(this.selectedStudentInfo.$id,this.selectedStudentInfo);
  // this.message = `Hello, ${data}!`;
 }
 
}

}

