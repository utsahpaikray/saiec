import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import * as SitesEffects from './sites.effects'
import { sitesFeature } from './sites.state'

@NgModule({
  declarations: [],
  imports: [
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([SitesEffects]),
    StoreModule.forFeature(sitesFeature)
  ]
})
export class SitesStoreModule {}
