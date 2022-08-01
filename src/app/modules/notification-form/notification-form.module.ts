import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    NotificationFormPageRoutingModule,
    AgGridModule
  ],
  declarations: [NotificationFormPage]
})
export class NotificationFormPageModule {}
