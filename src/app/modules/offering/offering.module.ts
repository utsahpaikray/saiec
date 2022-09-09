import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferingPageRoutingModule } from './offering-routing.module';

import { OfferingPage } from './offering.page';
import { MatInputModule } from '@angular/material/input';
import { OfferingFormComponent } from './components/offering-form/offering-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    OfferingPageRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  declarations: [OfferingPage,OfferingFormComponent]
})
export class OfferingPageModule {}
