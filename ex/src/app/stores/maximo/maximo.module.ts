import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import { ApolloModule } from 'apollo-angular'
import * as MaximoEffects from './maximo.effects'
import { maximoFeature } from './maximo.state'

@NgModule({
  declarations: [],
  imports: [
    ApolloModule,
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([MaximoEffects]),
    StoreModule.forFeature(maximoFeature)
  ]
})
export class MaximoStoreModule {}
