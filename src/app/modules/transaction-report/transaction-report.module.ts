import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionReportPageRoutingModule } from './transaction-report-routing.module';

import { TransactionReportPage } from './transaction-report.page';
import { ReportFormComponent } from './components/report-form/report-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionReportPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TransactionReportPage, ReportFormComponent]
})
export class TransactionReportPageModule {}
