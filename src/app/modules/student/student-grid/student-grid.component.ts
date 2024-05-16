import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalPage } from '@modules/shared/modal/modal.page';
import { groupBy, values } from 'lodash';
import { Student } from '../student.interface';

@Component({
  selector: 'app-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class StudentGridComponent {
  private modalCtrl = inject(ModalController);
  // Input property to receive allStudentClassWise data
  public sortByProperty = model.required<string>(); // Input property to receive sortByProperty value
  public allStudentInfo = model.required<Student[]>();
  public allStudentClassWise = computed(() => this.sortStudent());

  sortBy(property: any) {
    this.sortByProperty.set(property);
  }

  sortStudent(): any {
    return values(groupBy(this.allStudentInfo(), this.sortByProperty()));
  }
  public async showModal(info: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: { info: info },
      canDismiss: true,
      presentingElement: await this.modalCtrl.getTop(),
    });
    return await modal.present();
  }
}
