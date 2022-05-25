import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutofeePage } from './autofee.page';

const routes: Routes = [
  {
    path: '',
    component: AutofeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutofeePageRoutingModule {}
