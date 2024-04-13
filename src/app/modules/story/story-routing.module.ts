import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { storyPage } from './story.page';

const routes: Routes = [
  {
    path: '',
    component: storyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryPageRoutingModule {}
