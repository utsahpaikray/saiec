import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    AgGridModule,
    StaffTabularViewPageRoutingModule
  ],
  declarations: [StaffTabularViewPage]
})
export class StaffTabularViewPageModule {}
