import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrainingGuard } from '@core/guards/training.guard'
import { TrainingRequestComponent } from './training-request.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingRequestComponent,
    canActivate: [TrainingGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRequestRoutingModule {}
