import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { PictureModule } from '@components/picture/picture.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { SafeHtmlModule } from '@core/pipes/safe-html.module'
import { TrainingDetailComponent } from './training-detail.component'
import { TrainingDetailModulesComponent } from './components/training-detail-modules/training-detail-modules.component'
import { TrainingDetailsComponent } from './components/training-details/training-details.component'
import { TrainingDetailRoutingModule } from './training-detail-routing.module'
import { PreviousUrlService } from '@core/previous-url/previous-url.service'

@NgModule({
  declarations: [
    TrainingDetailComponent,
    TrainingDetailModulesComponent,
    TrainingDetailsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ProgressSpinnerModule,
    SafeHtmlModule,
    TrainingDetailRoutingModule,
    TranslocoRootModule,
    PictureModule
  ],
  providers: [PreviousUrlService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrainingDetailModule {}
