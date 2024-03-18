import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentTabularPageRoutingModule } from './student-tabular-routing.module';
import { StudentTabularPage } from './student-tabular.page';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTabularPageRoutingModule,
    AgGridModule
  ],
  declarations: [StudentTabularPage]
})
export class StudentTabularPageModule {}
