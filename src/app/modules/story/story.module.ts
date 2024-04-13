import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { storyPage } from './story.page';
import { StoryPageRoutingModule } from './story-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StoryPageRoutingModule
  ],
  declarations: [storyPage]
})
export class StoryPageModule {}
