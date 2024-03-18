import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvPageRoutingModule } from './adv-routing.module';

import { AdvPage } from './adv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvPageRoutingModule
  ],
  declarations: [AdvPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvPageModule {}
