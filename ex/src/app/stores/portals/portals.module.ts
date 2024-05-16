import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import * as portalsEffects from './portals.effects'
import { portalsFeature } from './portals.state'

@NgModule({
  declarations: [],
  imports: [
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([portalsEffects]),
    StoreModule.forFeature(portalsFeature)
  ]
})
export class PortalsStoreModule {}
