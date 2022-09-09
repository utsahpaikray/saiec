import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferingPage } from './offering.page';

const routes: Routes = [
  {
    path: '',
    component: OfferingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferingPageRoutingModule {}
