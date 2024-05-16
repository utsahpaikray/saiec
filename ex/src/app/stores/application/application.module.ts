import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { MaximoStoreModule } from '@stores/maximo/maximo.module'
import { SiteDetailStoreModule } from '@stores/site-details/site-detail.module'
import { AuthModule } from 'angular-auth-oidc-client'
import * as applicationEffects from './application.effects'
import { applicationFeature } from './application.state'
@NgModule({
  declarations: [],
  imports: [
    AuthModule,
    CurrentUserStoreModule,
    SiteDetailStoreModule,
    MaximoStoreModule,
    EffectsModule.forFeature([applicationEffects]),
    StoreModule.forFeature(applicationFeature)
  ]
})
export class ApplicationStoreModule {}
