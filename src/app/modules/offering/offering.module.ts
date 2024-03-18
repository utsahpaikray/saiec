import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferingPageRoutingModule } from './offering-routing.module';

import { OfferingPage } from './offering.page';
import { OfferingFormComponent } from './components/offering-form/offering-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    OfferingPageRoutingModule
  ],
  declarations: [OfferingPage,OfferingFormComponent]
})
export class OfferingPageModule {}
