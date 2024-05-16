import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { PortalsListComponent } from './portals-list.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [PortalsListComponent],
  exports: [PortalsListComponent],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TranslocoRootModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PortalsListModule {}
