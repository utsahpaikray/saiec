import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationFormPageRoutingModule } from './notification-form-routing.module';
import { NotificationFormPage } from './notification-form.page';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgGridModule,
    NotificationFormPageRoutingModule
  ],
  declarations:[NotificationFormPage]
})
export class NotificationFormPageModule {}
