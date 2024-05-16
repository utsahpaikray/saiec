import { Component, Input, ViewChild } from '@angular/core'
import { DynamicLinkComponent } from '@components/dynamic-link/dynamic-link.component'

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent {
  @ViewChild(DynamicLinkComponent) public routerLink: DynamicLinkComponent

  /**
   * Icon of the navigation item
   */
  @Input()
  icon?: string

  /**
   * Url of the navigation item
   */
  @Input()
  url?: string | string[]

  /**
   * Is navigation compact?
   */
  @Input()
  isCompact = false

  /**
   * Is navigation compact? (only icon)
   */
  @Input()
  isCollapsed = false

  /**
   * Is navigation vertical?
   */
  @Input()
  isVertical = false

  /**
   * Is router link active state supposed to match the exact link?
   */
  @Input()
  isExact = true

  public get isActive(): boolean {
    if (!this.routerLink?.routerLinkActive) {
      return false
    }

    return this.routerLink?.routerLinkActive?.isActive
  }
}
