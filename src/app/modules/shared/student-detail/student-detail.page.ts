import { Component, Input, OnInit, SimpleChanges } from '@angular/core';  
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {

  constructor(public modalCtrl: ModalController) {}  
  @Input('info') info: string;
  ngOnInit() {  
    console.log(this.info)
  }  
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  



}