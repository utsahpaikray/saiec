import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'

declare var Cookiebot: any

@Injectable()
export class CookiebotService {
  /**
   * Renew cookie consent
   */
  public renew(): void {
    if (!environment.production) {
      console.info('Cookiebot does not work on localhost')
      return
    }

    if (window.Cookiebot) {
      Cookiebot.renew()
    }
  }
}
