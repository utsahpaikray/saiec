import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { Store } from '@ngrx/store'
import { maximoFeature } from '@stores/maximo/maximo.state'

@Component({
  selector: 'app-warranty-claims-overview',
  templateUrl: './warranty-claims-overview.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WarrantyClaimsOverviewComponent {
  private store = inject(Store)
  public hasWriteAccess$ = this.store.select(
    maximoFeature.hasWriteAccessNotLoading
  )
}
