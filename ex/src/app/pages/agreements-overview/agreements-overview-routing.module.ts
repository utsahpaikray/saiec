import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AgreementsOverviewComponent } from './agreements-overview.component'

const routes: Routes = [
  {
    path: '',
    component: AgreementsOverviewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementsOverviewRoutingModule {}
