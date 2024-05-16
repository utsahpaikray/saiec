import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContextualCollaborationComponent } from './contextual-collaboration.component'

const routes: Routes = [
  {
    path: '',
    component: ContextualCollaborationComponent,
    children: [
      {
        path: '',
        data: { refreshCaseList: true },
        loadComponent: () =>
          import(
            '@pages/contextual-collaboration-case-overview/contextual-collaboration-case-overview.component'
          ).then((m) => m.ContextualCollaborationCasesComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import(
            '@pages/contextual-collaboration-new-case/contextual-collaboration-new-case.component'
          ).then((m) => m.ContextualCollaborationNewCaseComponent)
      },
      {
        path: ':caseId',
        loadComponent: () =>
          import(
            '@pages/contextual-collaboration-case-detail/contextual-collaboration-case-detail.component'
          ).then((m) => m.ContextualCollaborationCaseDetailComponent)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextualCollaborationRoutingModule {}
