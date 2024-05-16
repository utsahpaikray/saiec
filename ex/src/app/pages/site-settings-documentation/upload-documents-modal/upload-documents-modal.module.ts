import { AngularSvgIconModule } from 'angular-svg-icon'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

// Components
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ModalModule } from '@components/modal/modal.module'
import { FileUploadModule } from '@components/file-upload/file-upload.module'
import { UploadDocumentsModalComponent } from './upload-documents-modal.component'
import { AlertModule } from '@components/alert/alert.module'

import { DatalistModule } from '@components/datalist/datalist.module'
import { DropdownModule } from '@components/dropdown/dropdown.module'

@NgModule({
  declarations: [UploadDocumentsModalComponent],
  exports: [UploadDocumentsModalComponent],
  imports: [
    AngularSvgIconModule,
    AlertModule,

    CommonModule,
    DatalistModule,
    DropdownModule,
    ReactiveFormsModule,
    ModalModule,
    TranslocoRootModule,
    FileUploadModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploadDocumentsModalModule {}
