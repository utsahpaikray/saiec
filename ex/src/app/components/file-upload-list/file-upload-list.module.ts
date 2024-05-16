import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { FileUploadListComponent } from './file-upload-list.component'

@NgModule({
  declarations: [FileUploadListComponent],
  exports: [FileUploadListComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TranslocoRootModule
  ]
})
export class FileUploadListModule {}
