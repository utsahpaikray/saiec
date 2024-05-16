import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { LinkModule } from '@components/link/link.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { CookiebotService } from '@core/cookiebot/cookiebot.service'
import { FooterComponent } from './footer.component'
import { FooterLogoComponent } from './footer-logo/footer-logo.component'

@NgModule({
  declarations: [FooterComponent, FooterLogoComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    TranslocoRootModule,
    LinkModule
  ],
  providers: [CookiebotService]
})
export class FooterModule {}
