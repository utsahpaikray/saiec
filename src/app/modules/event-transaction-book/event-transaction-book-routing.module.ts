import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventTransactionBookPage } from './event-transaction-book.page';

const routes: Routes = [
  {
    path: '',
    component: EventTransactionBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventTransactionBookPageRoutingModule {}
