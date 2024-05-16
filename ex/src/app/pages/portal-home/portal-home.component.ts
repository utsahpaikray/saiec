import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LinkModule } from '@components/link/link.module'
import { NavigationItem } from '@components/navigation/navigation-item/navigation-item.interface'
import { NavigationModule } from '@components/navigation/navigation.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { Store } from '@ngrx/store'
import { PortalRouteSegments } from '@pages/portal/portal-route-segments.enum'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { filterNull } from '@stores/operators'
import { portalsFeature } from '@stores/portals/portals.state'
import { sitesFeature } from '@stores/sites/sites.state'
import { AngularSvgIconModule } from 'angular-svg-icon'

@Component({
  selector: 'app-portal-home',
  templateUrl: './portal-home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    NavigationModule,
    LinkModule,
    TitleModule,
    ProgressSpinnerModule,
    DefaultTemplateModule,
    TranslocoRootModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PortalHomeComponent {
  public PortalRouteSegments = PortalRouteSegments
  public navigationItems: NavigationItem[] = [
    {
      label: 'General.Users',
      url: ['../', PortalRouteSegments.Users],
      icon: 'users'
    }
  ]
  private store = inject(Store)
  public isSuperUserOrPortalAdmin$ = this.store.select(
    currentUserFeature.isSuperUserOrPortalAdmin
  )
  public currentPortal$ = this.store
    .select(portalsFeature.selectCurrentPortal)
    .pipe(filterNull())
  public sites$ = this.store
    .select(sitesFeature.selectSitesNotLoading)
    .pipe(filterNull())
}
