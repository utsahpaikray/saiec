import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentAutoFeePageRoutingModule } from './student-auto-fee-routing.module';
import { StudentAutoFeePage } from './student-auto-fee.page';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentAutoFeePageRoutingModule,
    AgGridModule
  ],
  declarations: [StudentAutoFeePage]
})
export class StudentAutoFeePageModule {}
