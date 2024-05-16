import { NgModule } from '@angular/core'
import {
  AbstractSecurityStorage,
  AuthModule,
  LogLevel
} from 'angular-auth-oidc-client'
import { environment } from '@environments/environment'
import { AuthStorageService } from '@core/auth/auth-storage.service'

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: environment.authorityUrl,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'portal-app',
        scope: 'openid roles offline_access phone language',
        responseType: 'code',
        autoUserInfo: true,
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Warn,
        ignoreNonceAfterRefresh: true,
        secureRoutes: [
          environment.apiUrl,
          environment.vodApi.basePath,
          ...environment.processInsights.apis,
        ]
      }
    })
  ],
  providers: [
    { provide: AbstractSecurityStorage, useClass: AuthStorageService }
  ],
  exports: [AuthModule]
})
export class AuthConfigModule {}
