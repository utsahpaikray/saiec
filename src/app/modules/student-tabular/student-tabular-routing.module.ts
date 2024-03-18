import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentTabularPage } from './student-tabular.page';

const routes: Routes = [
  {
    path: '',
    component: StudentTabularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentTabularPageRoutingModule {}
