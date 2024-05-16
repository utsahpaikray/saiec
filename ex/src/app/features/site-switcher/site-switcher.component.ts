import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { Router } from '@angular/router'

import { DropdownItem } from '@components/dropdown/dropdown-item.model'
import { Site } from '@core/generated/types'

@Component({
  selector: 'app-site-switcher',
  templateUrl: './site-switcher.component.html'
})
export class SiteSwitcherComponent implements OnChanges {
  /**
   * Id of site
   */
  @Input()
  public siteId: string | null

  /**
   * Id of site
   */
  @Input()
  public sites: Site[]

  /**
   * Site change handler
   */
  @Output()
  siteChange = new EventEmitter<Site>()

  public siteDropdownItems: DropdownItem[] = []

  constructor(private router: Router) {}

  /**
   * On Sites change set dropdown
   */
  public ngOnChanges(): void {
    this.setDropdownItems()
  }

  /**
   * Handle user item dropdown select
   * @param {string} value
   */
  public onSiteSelect(value: string): void {
    this.router.navigate([`/sites/${value}`])
  }

  /**
   * Set correct sites list based on role
   */
  private setDropdownItems(): void {
    if (!this.sites) {
      this.siteDropdownItems = []
      return
    }

    this.siteDropdownItems = this.sites.map(
      (site) => new DropdownItem(site.id, site.name)
    )
  }
}
