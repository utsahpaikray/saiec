import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeTablePageRoutingModule } from './time-table-routing.module';

import { TimeTablePage } from './time-table.page';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeTablePageRoutingModule
  ],
  declarations: [TimeTablePage, TableComponent]
})
export class TimeTablePageModule {}
