import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CertificationPathGuard } from '@core/guards/certification-path.guard'
import { TrainingCertificationPathComponent } from './training-certification-path.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingCertificationPathComponent,
    canActivate: [CertificationPathGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingCertificationPathRoutingModule {}
