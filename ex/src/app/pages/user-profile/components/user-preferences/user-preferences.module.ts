import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LinkModule } from '@components/link/link.module'
import { CookiebotService } from '@core/cookiebot/cookiebot.service'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { UserPreferencesComponent } from './user-preferences.component'

@NgModule({
  declarations: [UserPreferencesComponent],
  exports: [UserPreferencesComponent],
  imports: [CommonModule, FormsModule, LinkModule, TranslocoRootModule],
  providers: [CookiebotService]
})
export class UserPreferencesModule {}
