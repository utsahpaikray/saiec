import { AngularSvgIconModule } from 'angular-svg-icon'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { FileSizeModule } from '@core/pipes/file-size.module'
import { SiteSettingsDocumentationComponent } from '@pages/site-settings-documentation/site-settings-documentation.component'
import { SiteSettingsDocumentationRoutingModule } from './site-settings-documentation-routing.module'
import { DocumentationTableCategoryComponent } from './documentation-table-category/documentation-table-category.component'
import { UploadDocumentsModalModule } from './upload-documents-modal/upload-documents-modal.module'
import { TableComponent } from '@components/table/table.component'
import { DocumentDownloadService } from '@core/document-download/document-download.service'
import { ConfirmationModalModule } from '@components/confirmation-modal/confirmation-modal.module'

@NgModule({
  declarations: [
    SiteSettingsDocumentationComponent,
    DocumentationTableCategoryComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SiteSettingsDocumentationRoutingModule,
    ProgressSpinnerModule,
    AngularSvgIconModule,
    TranslocoRootModule,
    FileSizeModule,
    UploadDocumentsModalModule,
    TableComponent,
    ConfirmationModalModule
  ],
  providers: [DocumentDownloadService]
})
export class SiteSettingsDocumentationModule {}
