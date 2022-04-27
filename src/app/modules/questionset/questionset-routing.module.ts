import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsetPage } from './questionset.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionsetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsetPageRoutingModule {}
