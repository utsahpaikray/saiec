import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentDetailPageRoutingModule } from './student-detail-routing.module';
import { BrowserModule } from '@angular/platform-browser'
import { StudentDetailPage } from './student-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserModule,
    StudentDetailPageRoutingModule
  ],
  declarations: [StudentDetailPage]
})
export class StudentDetailPageModule {}
