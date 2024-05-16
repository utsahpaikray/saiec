import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

import { ActiveSiteAgreementComponent } from './active-site-agreement.component'
import { CardModule } from '@components/card/card.module'
import { CardContentListModule } from '@components/card/card-content-list/card-content-list.module'
import { CardMetaModule } from '@components/card/card-meta/card-meta.module'

@NgModule({
  declarations: [ActiveSiteAgreementComponent],
  exports: [ActiveSiteAgreementComponent],
  imports: [
    CommonModule,
    TranslocoRootModule,
    CardModule,
    CardContentListModule,
    CardMetaModule
  ]
})
export class ActiveSiteAgreementModule {}
