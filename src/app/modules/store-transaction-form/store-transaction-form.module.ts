import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreTransactionPageRoutingModule } from './store-transaction-form-routing.module';

import { StoreTransactionPage } from './store-transaction-form.page';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoreTransactionPageRoutingModule,
    MatInputModule
  ],
  declarations:[StoreTransactionPage]
})
export class StoreTransactionPageModule {}
