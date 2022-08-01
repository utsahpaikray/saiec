import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastController: ToastController) {}

  async presentToast(msg,dur) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      position: 'top',
    });
    toast.present();
  }
}
