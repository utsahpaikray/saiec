import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DocumentationCategoryComponent } from './documentation-category.component'

const routes: Routes = [
  {
    path: '',
    component: DocumentationCategoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationCategoryRoutingModule {}
