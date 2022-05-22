import { Component, OnInit } from '@angular/core';
import { std7 } from './../../../assets/student-info/standard7';
import { std6 } from './../../../assets/student-info/standard6';
import { std5 } from './../../../assets/student-info/standard5';
import { std4 } from './../../../assets/student-info/standard4';
import { std3 } from './../../../assets/student-info/standard3';
import { pioneer } from '../../../assets/student-info/pioneer';
import{ allStudentInfo } from '../../../assets/student-info/allStudentInfo'

import * as XLSX from 'xlsx'
import { groupBy,values } from 'lodash';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../shared/modal/modal.page';
import { DownloadUrlService } from 'src/app/shared-service/download-url.service';
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
  public allStudentInfo=allStudentInfo;
  public gridValue:boolean=false;
  searchQuery: any;
  allStudent: any[];
  itemsCount: number=1;
  allStudentClassWise: any[];
  constructor(public modalCtrl: ModalController, private storeService:DownloadUrlService) { 
     this.student7Info=std7;
     this.student6Info=std6;
     this.student5Info=std5;
     this.student4Info=std4;
     this.student3Info=std3;
     this.studentPioneerInfo=pioneer;
     this.allStudent=[...this.student7Info,...this.student6Info,...this.student5Info,...this.student4Info,...this.student3Info,...this.studentPioneerInfo]    
  }

  ngOnInit() {
    this.allStudentClassWise= values(groupBy(this.allStudentInfo, 'info.class'))
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
  public fetchUrl(url){
   let imageUrl= this.storeService.getFbStorageURl(url).subscribe(item=>{
      return item;
     });
     return imageUrl;
  }
  public async showModal(info) {  
    const modal = await this.modalCtrl.create({  
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {info:info},
      canDismiss:true,
      presentingElement: await this.modalCtrl.getTop()
    });  
    return await modal.present();  
  } 


}
