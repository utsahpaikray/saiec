import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentFeePageRoutingModule } from './student-fee-routing.module';

import { StudentFeePage } from './student-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentFeePageRoutingModule
  ],
  declarations: [StudentFeePage]
})
export class StudentFeePageModule {}
