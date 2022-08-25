import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamFormPageRoutingModule } from './exam-form-routing.module';

import { ExamFormPage } from './exam-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamFormPageRoutingModule
  ],
  declarations: [ExamFormPage]
})
export class ExamFormPageModule {}
