import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, input, model, signal } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Student } from '../student.interface';
import { groupBy, sortBy, values } from 'lodash';
import { ModalPage } from '@modules/shared/modal/modal.page';

@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss'],
  standalone: true,
  imports:[ 
    CommonModule,
    IonicModule
  ]
})
export class StudentGridComponent {
 // Input property to receive allStudentClassWise data
  public sortByProperty = model.required<string>(); // Input property to receive sortByProperty value
  public allStudentInfo = model.required<Student[]>();
  public allStudentClassWise = computed(() => this.sortStudent())
  constructor(public modalCtrl: ModalController) { }
  sortBy(property: any){
    this.sortByProperty.set(property)
    //this.sortStudent()
  }
  
sortStudent(): any{
  console.log(groupBy(this.allStudentInfo(), this.sortByProperty()))
  console.log(values(groupBy(this.allStudentInfo(), this.sortByProperty())))
  return values(groupBy(this.allStudentInfo(), this.sortByProperty()))
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
}
