import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { environment } from '@environments/environment'

/** Add Apim headers to all requests. */
@Injectable()
export class CmsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const reqUrl = req.url
    const cmsUrl = environment.cms.apiUrl

    if (reqUrl.startsWith(cmsUrl)) {
      const cmsReq = req.clone({
        headers: req.headers.delete('apollographql-client-name')
      })

      return next.handle(cmsReq)
    }

    return next.handle(req)
  }
}
