import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import { ApolloModule } from 'apollo-angular'
import * as CurrentUserEffects from './current-user.effects'
import { currentUserFeature } from './current-user.state'
@NgModule({
  declarations: [],
  imports: [
    ApolloModule,
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([CurrentUserEffects]),
    StoreModule.forFeature(currentUserFeature)
  ]
})
export class CurrentUserStoreModule {}
