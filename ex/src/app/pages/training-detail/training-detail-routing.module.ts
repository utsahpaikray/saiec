import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrainingGuard } from '@core/guards/training.guard'
import { TrainingDetailComponent } from './training-detail.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingDetailComponent,
    canActivate: [TrainingGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingDetailRoutingModule {}
