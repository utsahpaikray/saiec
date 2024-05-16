import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import { ApolloModule } from 'apollo-angular'
import * as Effects from './maximo-contacts.effects'
import { maximoContactFeature } from './maximo-contacts.state'

@NgModule({
  declarations: [],
  imports: [
    ApolloModule,
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([Effects]),
    StoreModule.forFeature(maximoContactFeature)
  ]
})
export class MaximoContactsStoreModule {}
