import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalPage } from '@modules/shared/modal/modal.page';
import { AuthService } from '@shared-service/auth-service.service';
import { Student } from '../student.interface';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  standalone: true,
  imports:[ 
    CommonModule,
    IonicModule,]
})
export class ProfileCardComponent  implements OnInit {
  public student = input.required<Student>()
  public isAuthorized = false;

  constructor(public modalCtrl: ModalController, private router: Router) { }
  private authService = inject(AuthService)
  
  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorizedUser
  }
  public async showModal(info: any) {
    const modal = await this.modalCtrl.create({
        component: ModalPage,
        cssClass: 'my-custom-class',
        componentProps: { info: info },
        canDismiss: true,
        presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
}
public showReport(std: any){
  this.router.navigate([`/report/${std.StudentName}`]);
}
}
