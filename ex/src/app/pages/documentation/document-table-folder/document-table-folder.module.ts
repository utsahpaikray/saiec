import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DocumentTableFolderComponent } from './document-table-folder.component'
import { DocumentTableFileModule } from '../document-table-file/document-table-file.module'
import { SortByPipeModule } from '@core/pipes/sort-by.module'

@NgModule({
  declarations: [DocumentTableFolderComponent],
  exports: [DocumentTableFolderComponent],
  imports: [
    AngularSvgIconModule,
    CommonModule,
    ComponentsModule,
    TranslocoRootModule,
    DocumentTableFileModule,
    SortByPipeModule
  ]
})
export class DocumentTableFolderModule {}
