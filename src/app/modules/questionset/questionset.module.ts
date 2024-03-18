import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsetPageRoutingModule } from './questionset-routing.module';

import { QuestionsetPage } from './questionset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsetPageRoutingModule
  ],
  declarations: [QuestionsetPage]
})
export class QuestionsetPageModule {}
