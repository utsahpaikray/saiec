import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SystemRoutingModule } from './system-routing.module'
import { SystemComponent } from './system.component'
import { ApiModule, Configuration } from '@pd-enrichment-data-product'
import {
  MapStoreModule,
  RectangleSelectionStoreModule,
  TopologySelectionStoreModule,
  TopologyStoreModule
} from '@map-features'
import { AuthModule } from 'angular-auth-oidc-client'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { environment } from '@environments/environment'

@NgModule({
  declarations: [SystemComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ApiModule,
    MapStoreModule,
    TopologyStoreModule,
    TopologySelectionStoreModule,
    RectangleSelectionStoreModule,
    AuthModule,
    TranslocoRootModule
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: () =>
        new Configuration({
          basePath: environment.vodApi.basePath
        }),
      deps: []
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule {}
