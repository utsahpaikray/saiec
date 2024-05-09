import { CommonModule } from '@angular/common';
import { Component, OnInit, input, model } from '@angular/core';
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
export class StudentGridComponent  implements OnInit {
  public allStudentClassWise = model.required<any>()// Input property to receive allStudentClassWise data
  public sortByProperty = input.required<string>(); // Input property to receive sortByProperty value
  public classValue= input.required<string>()
  public allStudentInfo = input.required<Student[]>();
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}
  sortBy(property: any){
    console.log(this.allStudentClassWise())
    this.allStudentClassWise.update(()=>this.sortStudent(property))
}
sortStudent(property: any): any{
 // this.sortByProperty = property
 console.log(groupBy(this.allStudentInfo(), property))
  return values(groupBy(this.allStudentInfo(), property))
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
