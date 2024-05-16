import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  HostBinding,
  Output,
  inject
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ApplicationStoreModule } from '@stores/application/application.module'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { PortalsStoreModule } from '@stores/portals/portals.module'
import { SiteDetailStoreModule } from '@stores/site-details/site-detail.module'
import { SitesStoreModule } from '@stores/sites/sites.module'
import { Observable } from 'rxjs'
import { HeaderService } from './header.service'
import { HeaderItemType, HeaderMenuId, HeaderVM } from './header.vm'
import { RecentlyUsedStoreModule } from '@stores/recently-used/recently-used.module'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoRootModule,
    RouterModule,
    CurrentUserStoreModule,
    PortalsStoreModule,
    SitesStoreModule,
    SiteDetailStoreModule,
    ApplicationStoreModule,
    RecentlyUsedStoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  @HostBinding('class') public class = 'min-h-l d-inline-block'
  @Output() logoutRequest = new EventEmitter<boolean>()

  public HeaderItemType = HeaderItemType

  private headerService = inject(HeaderService)

  public vm$: Observable<HeaderVM> = this.headerService.getVM$()

  public openLink = (link: string, target = '_blank'): Window | null =>
    window.open(link, target)

  public filterChanged(itemId: HeaderMenuId, event: KeyboardEvent): void {
    const input = event.target
    const isInput = input instanceof HTMLInputElement
    if (!isInput) {
      return
    }
    if (itemId === HeaderMenuId.Portals) {
      this.headerService.queryPortals(input.value)
    }
    if (itemId === HeaderMenuId.Sites) {
      this.headerService.querySites(input.value)
    }
  }

  public filterBlur(itemId: HeaderMenuId, event: Event): void {
    // Set timeout is needed to prevent the filter from being cleared before the click event is fired
    setTimeout(() => {
      const input = event.target
      const isInput = input instanceof HTMLInputElement
      if (!isInput || !input.value) {
        return
      }
      input.value = ''
      if (itemId === HeaderMenuId.Portals) {
        this.headerService.resetPortalsQuery()
      }
      if (itemId === HeaderMenuId.Sites) {
        this.headerService.resetSitesQuery()
      }
    }, 300)
  }
}
