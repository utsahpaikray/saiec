import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { SafeHtmlModule } from '@core/pipes/safe-html.module'
import { FileSizeModule } from '@core/pipes/file-size.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { DocumentSearchComponent } from './document-search.component'
import { DocumentDownloadService } from '../../../core/document-download/document-download.service'

@NgModule({
  declarations: [DocumentSearchComponent],
  exports: [DocumentSearchComponent],
  imports: [
    AngularSvgIconModule,
    CommonModule,
    ProgressSpinnerModule,
    SafeHtmlModule,
    FileSizeModule,
    TranslocoRootModule
  ],
  providers: [DocumentDownloadService]
})
export class DocumentSearchModule {}
