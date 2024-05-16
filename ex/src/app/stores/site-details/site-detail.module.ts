import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import { siteDetailFeature } from './site-detail.state'
import * as SiteDetailEffects from './site-detail.effects'

@NgModule({
  declarations: [],
  imports: [
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([SiteDetailEffects]),
    StoreModule.forFeature(siteDetailFeature)
  ]
})
export class SiteDetailStoreModule {}
