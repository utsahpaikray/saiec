import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { MaximoStoreModule } from '@stores/maximo/maximo.module'
import { TicketsRoutingModule } from './tickets-routing.module'
import { TicketsComponent } from './tickets.component'

@NgModule({
  declarations: [TicketsComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    TranslocoRootModule,
    TitleModule,
    MaximoStoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsModule {}
