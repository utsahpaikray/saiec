import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { GraphComponent } from './components/graph/graph.component';
import { MarkBaseDirective } from './directives/mark-base.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPageRoutingModule
  ],
  declarations: [ReportPage,GraphComponent, MarkBaseDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportPageModule {}
