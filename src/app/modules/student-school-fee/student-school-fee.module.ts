import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentSchoolFeePageRoutingModule } from './student-school-fee-routing.module';
import { StudentSchoolFeePage } from './student-school-fee.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentSchoolFeePageRoutingModule,
    AgGridModule
  ],
  declarations: [StudentSchoolFeePage]
})
export class StudentSchoolFeePageModule {}
