import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DocumentTableComponent } from './document-table.component'
import { DocumentTableFileModule } from '../document-table-file/document-table-file.module'
import { DocumentTableFolderModule } from '../document-table-folder/document-table-folder.module'
import { SortByPipeModule } from '@core/pipes/sort-by.module'
import { TableComponent } from '@components/table/table.component'

@NgModule({
  declarations: [DocumentTableComponent],
  exports: [DocumentTableComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ProgressSpinnerModule,
    TranslocoRootModule,
    DocumentTableFileModule,
    DocumentTableFolderModule,
    SortByPipeModule,
    TableComponent
  ]
})
export class DocumentTableModule {}
