import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreTransactionListPage } from './store-transaction-list.page';

const routes: Routes = [
  {
    path: '',
    component: StoreTransactionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreTransactionListPageRoutingModule {}
