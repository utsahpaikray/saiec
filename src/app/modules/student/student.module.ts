import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';
import { ExtractStudentComponent } from '../shared/extract-student/extract-student.component';
import { StudentStoreModule } from '../../states/student/student.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    StudentStoreModule,
    ScrollingModule
  ],
  declarations: [StudentPage,ExtractStudentComponent]
})
export class StudentPageModule {}
