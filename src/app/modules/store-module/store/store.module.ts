import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';
import { StorePage } from './store.page';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgGridModule,
    StorePageRoutingModule
  ],
  declarations:[StorePage]
})
export class StorePageModule {}
