import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss']
})
export class SiteSettingsComponent {
  @HostBinding('class') class = 'd-flex flex-col gap-s m-auto p-m'
}
