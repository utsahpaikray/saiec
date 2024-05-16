import { Component } from '@angular/core'
import { NavigationItem } from '@components/navigation/navigation-item/navigation-item.interface'
import { SiteSettingsRouteSegments } from '@pages/site-settings/site-settings-route-segments.enum'

@Component({
  selector: 'app-site-settings-overview',
  templateUrl: './site-settings-overview.component.html'
})
export class SiteSettingsOverviewComponent {
  public navigationItems: NavigationItem[] = [
    {
      label: 'SiteAdmin.GeneralSettings',
      icon: 'configuration',
      url: ['./', SiteSettingsRouteSegments.General]
    },
    {
      label: 'SiteAdmin.Documentation',
      icon: 'documents',
      url: ['./', SiteSettingsRouteSegments.Documentation]
    },
    {
      label: 'SiteAdmin.Contacts',
      icon: 'contacts',
      url: ['./', SiteSettingsRouteSegments.Contacts]
    }
  ]
}
