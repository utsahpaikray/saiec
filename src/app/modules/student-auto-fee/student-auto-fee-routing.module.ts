import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentAutoFeePage } from './student-auto-fee.page';

const routes: Routes = [
  {
    path: '',
    component: StudentAutoFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentAutoFeePageRoutingModule {}
