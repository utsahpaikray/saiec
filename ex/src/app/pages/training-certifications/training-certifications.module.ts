import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { PictureModule } from '@components/picture/picture.module'
import { RichTextModule } from '@components/rich-text/rich-text.component.module'
import { LinkModule } from '@components/link/link.module'

import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TrainingCertificationsRoutingModule } from './training-certifications-routing.module'
import { TrainingCertificationsComponent } from './training-certifications.component'

@NgModule({
  declarations: [TrainingCertificationsComponent],
  imports: [
    CommonModule,
    LinkModule,

    ProgressSpinnerModule,
    RichTextModule,
    TrainingCertificationsRoutingModule,
    TranslocoRootModule,
    AngularSvgIconModule,
    PictureModule
  ]
})
export class TrainingCertificationsModule {}
