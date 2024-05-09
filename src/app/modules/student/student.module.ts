import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { StudentStoreModule } from '../../states/student/student.module';
import { ExtractStudentComponent } from '../shared/extract-student/extract-student.component';
import { StudentPage } from './student.page';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { StudentGridComponent } from './student-grid/student-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    StudentStoreModule,
    ScrollingModule,
    ProfileCardComponent,
    StudentGridComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [StudentPage,ExtractStudentComponent]
})
export class StudentPageModule {}
