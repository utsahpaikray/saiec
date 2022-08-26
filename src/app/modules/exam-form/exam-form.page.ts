
import { ModalController } from '@ionic/angular';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { groupBy, keys, values } from 'lodash'
import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.page.html',
  styleUrls: ['./exam-form.page.scss'],
})
export class ExamFormPage implements OnInit {
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  rowData: any;
  names: any;
  monthWiseData: any;
  @ViewChild('pdfTable', { read: ElementRef }) pdfTable:ElementRef;
  pdfOptions: any;
  workspaceService: any;
  constructor(public modalCtrl: ModalController, private storeService: DownloadUrlService, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getStudent();
  }
  getStudent() {
    this.firebaseService.getAllExamDetail().subscribe(items => {
      this.rowData = groupBy(items, 'studentName')
      this.names = keys(this.rowData)
    })
  }
  selectStudent(value) {
    this.monthWiseData = this.sortByMonth(groupBy(this.rowData[value], 'month')).map(item=>{
      
      item.visible=true;
      return item
      console.log(item)
    })
    console.log(this.monthWiseData)
  }
  selectMonth(value) {
    this.monthWiseData.forEach(item=>{
      if(value=="All"){
        item.visible=true;
      }else if(item[0]==value){
        item.visible=true;
      }else{
        item.visible=false;
      }
     
   })
  
  }
  sortByMonth(arr) {
    let sortable = [];
    for (var data in arr) {
      sortable.push([data, arr[data]]);
    }
    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return sortable.sort(function (a, b) {
      return months.indexOf(a[0])
        - months.indexOf(b[0]);
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

}

