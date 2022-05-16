import { Component, OnInit } from '@angular/core';
import { std7 } from './../../../assets/student-info/standard7';
import { std6 } from './../../../assets/student-info/standard6';
import { std5 } from './../../../assets/student-info/standard5';
import { std4 } from './../../../assets/student-info/standard4';
import { std3 } from './../../../assets/student-info/standard3';
import { pioneer } from '../../../assets/student-info/pioneer';

import * as XLSX from 'xlsx'
import { groupBy,values } from 'lodash';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../shared/modal/modal.page';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public student7Info;
  public student6Info;
  public student5Info;
  public student4Info;
  public student3Info;
  public studentPioneerInfo;
  public gridValue:boolean=false;
  searchQuery: any;
  allStudent: any[];
  itemsCount: number=1;
  allStudentClassWise: any[];
  constructor(public modalCtrl: ModalController) { 
     this.student7Info=std7;
     this.student6Info=std6;
     this.student5Info=std5;
     this.student4Info=std4;
     this.student3Info=std3;
     this.studentPioneerInfo=pioneer;
     this.allStudent=[...this.student7Info,...this.student6Info,...this.student5Info,...this.student4Info,...this.student3Info,...this.studentPioneerInfo]
    
     
  }

  ngOnInit() {
    this.allStudentClassWise= values(groupBy(this.allStudent, 'Class'))
    console.log(this.allStudentClassWise)
  }
  public onInput(){
    const items = Array.from(document.querySelector('.student-info').children);
     this.itemsCount=0;
    requestAnimationFrame(() => {
      items.forEach((item) => {
        Array.from(item.children).forEach((item) => {
       const shouldShow = item.textContent.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
       this.itemsCount=shouldShow?this.itemsCount+1:this.itemsCount;
       item['style'].display = shouldShow ? 'block' : 'none';
        })
      }); 

    });
  }
  public ongrid(){
  
  }
  public async showModal(info) {  
    console.log(info)
    const modal = await this.modalCtrl.create({  
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {info:info},
      canDismiss:true,
      presentingElement: await this.modalCtrl.getTop()
    });  
    return await modal.present();  
  } 
  // public selectedFile(event){
  //  let  selectedFile = event.target.files[0];
  //   // XLSX.utils.json_to_sheet(data, 'out.xlsx');
  //   if(selectedFile){
  //       let fileReader = new FileReader();
  //       fileReader.readAsBinaryString(selectedFile);
  //       fileReader.onload = (event)=>{
  //        let data = event.target.result;
  //        let workbook = XLSX.read(data,{type:"binary"});
  //        console.log(workbook);
  //        workbook.SheetNames.forEach(sheet => {
  //             let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  //             console.log(rowObject);
  //           //  document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
  //        });
  //       }
  //   }
  // }

}
