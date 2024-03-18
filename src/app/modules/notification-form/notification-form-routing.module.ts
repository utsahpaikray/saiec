import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationFormPage } from './notification-form.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationFormPageRoutingModule {}
