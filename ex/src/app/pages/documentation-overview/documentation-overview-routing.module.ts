import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DocumentationOverviewComponent } from './documentation-overview.component'

const routes: Routes = [
  {
    path: '',
    component: DocumentationOverviewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationOverviewRoutingModule {}
