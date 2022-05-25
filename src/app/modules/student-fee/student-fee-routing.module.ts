import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentFeePage } from './student-fee.page';

const routes: Routes = [
  {
    path: '',
    component: StudentFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentFeePageRoutingModule {}
