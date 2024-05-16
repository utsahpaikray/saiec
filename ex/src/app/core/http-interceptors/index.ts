import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from 'angular-auth-oidc-client'

import { CmsInterceptor } from './cms-interceptor'

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CmsInterceptor, multi: true }
]
