import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreTransactionListPageRoutingModule } from './store-transaction-list-routing.module';

import { StoreTransactionListPage } from './store-transaction-list.page';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreTransactionListPageRoutingModule,
    MatInputModule
  ],
  declarations:[StoreTransactionListPage]
})
export class StoreTransactionListPageModule {}
