import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamDetailPageRoutingModule } from './exam-detail-routing.module';

import { ExamDetailPage } from './exam-detail.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamDetailPageRoutingModule,
    AgGridModule
  ],
  declarations: [ExamDetailPage]
})
export class ExamDetailPageModule {}
