import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { OfferingPage } from './offering.page';
const routes: Routes = [
  {
    path: '',
    component: OfferingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class OfferingPageRoutingModule {}
