import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamDetailPage } from './exam-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExamDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamDetailPageRoutingModule {}
