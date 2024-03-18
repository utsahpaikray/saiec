import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentSchoolFeePage } from './student-school-fee.page';

const routes: Routes = [
  {
    path: '',
    component: StudentSchoolFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSchoolFeePageRoutingModule {}
