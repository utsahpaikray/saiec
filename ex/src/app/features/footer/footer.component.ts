import { Component } from '@angular/core'
import { CookiebotService } from '@core/cookiebot/cookiebot.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public year = new Date().getFullYear()

  constructor(private cookiebotService: CookiebotService) {}

  //Links
  public vanderlandePrivacyStatementUrl =
    'https://www.vanderlande.com/privacy-statement'
  public vanderlandeCookiePolicyUrl =
    'https://www.vanderlande.com/cookie-policy/'

  /**
   * Open cookiebot cookie consent banner
   */
  public openCookieConsent(): void {
    this.cookiebotService.renew()
  }
}
