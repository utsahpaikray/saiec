import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DocumentTableFileComponent } from './document-table-file.component'

// Pipes
import { FileSizeModule } from '@core/pipes/file-size.module'
import { SafeHtmlModule } from '@core/pipes/safe-html.module'
import { DocumentDownloadService } from '../../../core/document-download/document-download.service'

@NgModule({
  declarations: [DocumentTableFileComponent],
  exports: [DocumentTableFileComponent],
  imports: [
    AngularSvgIconModule,
    CommonModule,
    ComponentsModule,
    SafeHtmlModule,
    TranslocoRootModule,
    FileSizeModule
  ],
  providers: [DocumentDownloadService]
})
export class DocumentTableFileModule {}
