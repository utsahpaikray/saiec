import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import * as recentlyUsedEffects from './recently-used.effects'
import { recentlyUsedFeature } from './recently-used.state'
import { PortalsStoreModule } from '@stores/portals/portals.module'
import { SiteDetailStoreModule } from '@stores/site-details/site-detail.module'

@NgModule({
  declarations: [],
  imports: [
    PortalsStoreModule,
    SiteDetailStoreModule,
    EffectsModule.forFeature([recentlyUsedEffects]),
    StoreModule.forFeature(recentlyUsedFeature)
  ]
})
export class RecentlyUsedStoreModule {}
