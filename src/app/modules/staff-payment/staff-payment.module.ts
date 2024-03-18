import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffPaymentPageRoutingModule } from './staff-payment-routing.module';
import { StaffPaymentPage } from './staff-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffPaymentPageRoutingModule
  ],
  declarations:[StaffPaymentPage]
})
export class StaffPaymentPageModule {}
