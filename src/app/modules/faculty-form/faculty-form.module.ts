import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacultyFormPageRoutingModule } from './faculty-form-routing.module';

import { FacultyFormPage } from './faculty-form.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacultyFormPageRoutingModule,
    AgGridModule
  ],
  declarations: [FacultyFormPage]
})
export class FacultyFormPageModule {}
