import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrainingComponent } from './training.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pages/training-overview/training-overview.module').then(
            (m) => m.TrainingOverviewModule
          )
      },
      {
        path: 'certifications',
        loadChildren: () =>
          import(
            '@pages/training-certifications/training-certifications.module'
          ).then((m) => m.TrainingCertificationsModule)
      },
      {
        path: 'certifications/request',
        loadChildren: () =>
          import('@pages/training-request/training-request.module').then(
            (m) => m.TrainingRequestModule
          )
      },
      {
        path: 'certifications/:trainingId',
        loadChildren: () =>
          import('@pages/training-detail/training-detail.module').then(
            (m) => m.TrainingDetailModule
          )
      },
      {
        path: 'certifications/:trainingId/request',
        loadChildren: () =>
          import('@pages/training-request/training-request.module').then(
            (m) => m.TrainingRequestModule
          )
      },
      {
        path: ':certificateId',
        loadChildren: () =>
          import(
            '@pages/training-certification-path/training-certification-path.module'
          ).then((m) => m.TrainingCertificationPathModule)
      },
      {
        path: ':certificateId/:trainingId',
        loadChildren: () =>
          import('@pages/training-detail/training-detail.module').then(
            (m) => m.TrainingDetailModule
          )
      },
      {
        path: ':certificateId/:trainingId/request',
        loadChildren: () =>
          import('@pages/training-request/training-request.module').then(
            (m) => m.TrainingRequestModule
          )
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
