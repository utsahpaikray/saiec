import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage {

  constructor(public modalCtrl: ModalController) {}  
  @Input() info: any;

  dismiss() {  
    this.modalCtrl.dismiss();  
  }  



}