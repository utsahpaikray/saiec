import { NgModule } from '@angular/core'
import { GraphQLModule } from '@core/graphql/graphql.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AuthModule } from 'angular-auth-oidc-client'
import { ApolloModule } from 'apollo-angular'
import * as Effects from './attachment.effects'
import { attachmentFeature } from './attachment.state'

@NgModule({
  declarations: [],
  imports: [
    ApolloModule,
    GraphQLModule,
    AuthModule,
    EffectsModule.forFeature([Effects]),
    StoreModule.forFeature(attachmentFeature)
  ]
})
export class AttachmentStoreModule {}
