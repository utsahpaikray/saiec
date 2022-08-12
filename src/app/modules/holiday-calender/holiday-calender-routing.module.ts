import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolidayCalenderPage } from './holiday-calender.page';

const routes: Routes = [
  {
    path: '',
    component: HolidayCalenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayCalenderPageRoutingModule {}
