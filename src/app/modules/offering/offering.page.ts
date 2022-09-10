import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/shared-service/firebaseService/firebase-service.service';
import { OfferingFormComponent } from './components/offering-form/offering-form.component';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.page.html',
  styleUrls: ['./offering.page.scss'],
})
export class OfferingPage implements OnInit {
offeringList=[]
  sum=0;
  constructor(public modalCtrl: ModalController,public firebaseService:FirebaseService) { }

  ngOnInit() {
   this.getOffering();
  }
  getOffering() {
    this.firebaseService.getAllOffering().subscribe(items=>{
      this.offeringList=items;
      this.offeringList.forEach(item=>{
        this.sum=this.sum+Number(item.amount);
      })
    })
  }
  delete(info){
    this.firebaseService.deleteOffering(info.$id)
  }
  public async showModal(info?,mode?:'add') {
    const modal = await this.modalCtrl.create({
      component: OfferingFormComponent,
      cssClass: 'my-custom-class',
      componentProps: { info,mode},
      canDismiss: true,
      mode: 'ios'
    });
    return await modal.present();
  }

}
