import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffTabularViewPageRoutingModule } from './staff-tabular-view-routing.module';

import { StaffTabularViewPage } from './staff-tabular-view.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffTabularViewPageRoutingModule,
    AgGridModule
  ],
  declarations: [StaffTabularViewPage]
})
export class StaffTabularViewPageModule {}
