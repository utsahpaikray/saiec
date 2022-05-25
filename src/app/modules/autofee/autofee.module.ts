import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutofeePageRoutingModule } from './autofee-routing.module';

import { AutofeePage } from './autofee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutofeePageRoutingModule
  ],
  declarations: [AutofeePage]
})
export class AutofeePageModule {}
