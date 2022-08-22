import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffTabularViewPage } from './staff-tabular-view.page';

const routes: Routes = [
  {
    path: '',
    component: StaffTabularViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffTabularViewPageRoutingModule {}
