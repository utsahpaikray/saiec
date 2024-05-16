import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { CrumbtrailComponent } from '@shared/components/crumbtrail/crumbtrail.component'
import { FormPageComponent } from '@shared/components/form-page/form-page.component'
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component'
import { SiteSettingFormComponent } from './components/site-setting-form/site-setting-form.component'
import { SiteSettingsGeneralService } from './site-settings-general.service'
import { map, shareReplay } from 'rxjs'
import { SiteSettingFormValue } from './components/site-setting-form/site-setting-form.interface'

@Component({
  selector: 'app-site-settings-general',
  templateUrl: './site-settings-general.component.html',
  styleUrls: ['./site-settings-general.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    RouterModule,
    CrumbtrailComponent,
    PageHeaderComponent,
    SiteSettingFormComponent,
    FormPageComponent
  ]
})
export class SiteSettingsGeneralComponent {
  public siteSettingService = inject(SiteSettingsGeneralService)
  public vm$ = this.siteSettingService.getSiteSettingGeneralVM$()
  public control$ = this.vm$.pipe(
    map(
      ({ siteSettingFormValue }) =>
        new FormControl<SiteSettingFormValue>(siteSettingFormValue, [
          Validators.required
        ])
    ),
    shareReplay(1)
  )

  public onSubmit(value: SiteSettingFormValue | null) {
    if (value) {
      this.siteSettingService.updateSiteConfigs(value)
    }
  }
}
