import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdiomsPage } from './idioms.page';
import { IdiomsRoutingModule } from './idioms-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IdiomsRoutingModule
  ],
  declarations: [IdiomsPage]
})
export class IdiomsPageModule {}
