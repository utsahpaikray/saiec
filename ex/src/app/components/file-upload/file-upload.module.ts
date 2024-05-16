import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { AlertModule } from '../alert/alert.module'

import { FileUploadComponent } from './file-upload.component'

@NgModule({
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
  imports: [AngularSvgIconModule, CommonModule, AlertModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FileUploadModule {}
