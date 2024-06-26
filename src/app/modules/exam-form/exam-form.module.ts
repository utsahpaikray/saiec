import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamFormPageRoutingModule } from './exam-form-routing.module';

import { ExamFormPage } from './exam-form.page';
import { ExamFormComponent } from './components/transaction-form/exam-form.component';
import { NonAcademicFormComponent } from './components/non-academic-form/non-academic-form.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamFormPageRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [ExamFormPage,ExamFormComponent, NonAcademicFormComponent]
})
export class ExamFormPageModule {}
