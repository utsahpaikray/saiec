import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DocumentationComponent } from './documentation.component'

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '@pages/documentation-overview/documentation-overview.module'
          ).then((m) => m.DocumentationOverviewModule)
      },
      {
        path: ':categoryCodeName',
        loadChildren: () =>
          import(
            '@pages/documentation-category/documentation-category.module'
          ).then((m) => m.DocumentationCategoryModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule {}
