import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../../../../shared-service/firebaseService/firebase-service.service';
import * as _moment from 'moment';
@Component({
  selector: 'app-offering-form',
  templateUrl: './offering-form.component.html',
  styleUrls: ['./offering-form.component.scss'],
})
export class OfferingFormComponent implements OnInit {
  offeringForm!: FormGroup;
  @Input() info: any
  @Input() mode: any
  constructor(private fb:FormBuilder,public modalCtrl: ModalController,public firebaseService:FirebaseService,private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.info)
    this.createGalleryForm();
    if(this.mode=='edit'){
      this.offeringForm.patchValue(this.info)
      this.offeringForm?.get('date')?.patchValue(new Date(this.info.date))
    }
  }
  createGalleryForm() {
    this.offeringForm = this.fb.group({
      name: '',
      date: '',
      amount:'',
      description: '',
    });
   
    console.log(this.offeringForm)
  }
  submit(){
    this.offeringForm.value.date=this.offeringForm.value.date.toString()
    if(this.mode=='edit'){
      this.firebaseService.updateOffering(this.info.$id,this.offeringForm.value);
    }else{
      this.firebaseService.pushItems('offering',this.offeringForm.value)
    }
    this.offeringForm.reset();
   this.presentToast('top','successfully updated')
  }
  async presentToast(position: 'top' | 'middle' | 'bottom',msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
