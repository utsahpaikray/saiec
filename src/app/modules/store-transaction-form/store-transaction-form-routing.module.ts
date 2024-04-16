import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreTransactionPage } from './store-transaction-form.page';

const routes: Routes = [
  {
    path: '',
    component: StoreTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreTransactionPageRoutingModule {}
