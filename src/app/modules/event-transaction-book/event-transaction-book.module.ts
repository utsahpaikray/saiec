import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventTransactionBookPageRoutingModule } from './event-transaction-book-routing.module';

import { EventTransactionBookPage } from './event-transaction-book.page';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventTransactionBookPageRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  declarations: [EventTransactionBookPage,TransactionFormComponent]
})
export class EventTransactionBookPageModule {}
