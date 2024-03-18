import { Component, Input, OnInit, SimpleChanges } from '@angular/core';  
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  constructor(public modalCtrl: ModalController) {}  
  @Input() info: any; 
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  



}
  
  
 
