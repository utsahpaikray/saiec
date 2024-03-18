import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffPaymentPage } from './staff-payment.page';

const routes: Routes = [
  {
    path: '',
    component: StaffPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffPaymentPageRoutingModule {}
