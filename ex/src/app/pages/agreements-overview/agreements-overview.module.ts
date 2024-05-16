import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { AgreementsOverviewComponent } from './agreements-overview.component'
import { AgreementsOverviewRoutingModule } from './agreements-overview-routing.module'
import { SectionAsideRightModule } from '@features/layouts/section-aside-right/section-aside-right.module'
import { ActiveSiteAgreementModule } from '@components/active-site-agreement/active-site-agreement.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

@NgModule({
  declarations: [AgreementsOverviewComponent],
  imports: [
    CommonModule,
    AgreementsOverviewRoutingModule,
    ProgressSpinnerModule,
    SectionAsideRightModule,
    ActiveSiteAgreementModule,
    TranslocoRootModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgreementsOverviewModule {}
