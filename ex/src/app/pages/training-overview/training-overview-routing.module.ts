import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrainingOverviewComponent } from './training-overview.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingOverviewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingOverviewRoutingModule {}
