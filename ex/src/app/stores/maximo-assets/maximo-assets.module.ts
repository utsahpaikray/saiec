import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { ApolloModule } from 'apollo-angular'
import * as MaximoAssetsEffects from './maximo-assets.effects'
import { maximoAssetsFeature } from './maximo-assets.state'

@NgModule({
  declarations: [],
  imports: [
    ApolloModule,
    GraphQLModule,
    EffectsModule.forFeature([MaximoAssetsEffects]),
    StoreModule.forFeature(maximoAssetsFeature)
  ]
})
export class MaximoAssetsStoreModule {}
