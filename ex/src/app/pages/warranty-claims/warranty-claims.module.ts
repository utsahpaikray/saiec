import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { MaximoStoreModule } from '@stores/maximo/maximo.module'
import { WarrantyClaimsRoutingModule } from './warranty-claims-routing.module'
import { WarrantyClaimsComponent } from './warranty-claims.component'

@NgModule({
  declarations: [WarrantyClaimsComponent],
  imports: [
    CommonModule,
    WarrantyClaimsRoutingModule,
    TranslocoRootModule,
    TitleModule,
    MaximoStoreModule
  ]
})
export class WarrantyClaimsModule {}
