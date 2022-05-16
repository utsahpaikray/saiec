import { Component, Input, OnInit, SimpleChanges } from '@angular/core';  
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  constructor(public modalCtrl: ModalController) {}  
  @Input('info') info: string;
  ngOnInit() {  
    console.log(this.info)
  }  
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  



}
  
  
 
