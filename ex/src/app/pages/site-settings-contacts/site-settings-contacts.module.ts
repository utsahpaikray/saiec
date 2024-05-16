import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

// Components
import { SiteSettingsContactsComponent } from './site-settings-contacts.component'
import { SiteSettingsContactsRoutingModule } from './site-settings-contacts-routing.module'
import { ExpansionPanelModule } from '@components/expansion-panel/expansion-panel.module'
import { TitleModule } from '@components/title/title.module'
import { LinkModule } from '@components/link/link.module'
import { TextAreaModule } from '@components/text-area/text-area.module'

import { FormModule } from '@components/form/form.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { SiteSettingsContactsService } from './site-settings-contacts.service'

@NgModule({
  declarations: [SiteSettingsContactsComponent],
  imports: [
    CommonModule,
    SiteSettingsContactsRoutingModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    TitleModule,
    ExpansionPanelModule,
    FormModule,
    LinkModule,
    TextAreaModule,
    ProgressSpinnerModule
  ],
  providers: [SiteSettingsContactsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteSettingsContactsModule {}
