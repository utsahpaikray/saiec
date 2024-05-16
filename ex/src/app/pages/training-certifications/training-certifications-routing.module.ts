import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrainingCertificationsComponent } from './training-certifications.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingCertificationsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingCertificationsRoutingModule {}
