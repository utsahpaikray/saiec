import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

// Components
import { TitleModule } from '@components/title/title.module'
import { MaximoStoreModule } from '@stores/maximo/maximo.module'
import { AgreementsRoutingModule } from './agreements-routing.module'
import { AgreementsComponent } from './agreements.component'

@NgModule({
  declarations: [AgreementsComponent],
  imports: [
    CommonModule,
    AgreementsRoutingModule,
    TranslocoRootModule,
    TitleModule,
    MaximoStoreModule
  ]
})
export class AgreementsModule {}
