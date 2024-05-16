import { Component, Input } from '@angular/core'
import { NavigationItem } from './navigation-item/navigation-item.interface'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  /**
   * Is navigation compact?
   */
  @Input()
  isCompact = false

  /**
   * Is navigation collapsed? (only icon)
   */
  @Input()
  isCollapsed = false

  /**
   * Is navigation vertical?
   */
  @Input()
  isVertical = false

  /**
   * Navigation items.
   * Site navigation items are default
   */
  @Input()
  public items: NavigationItem[] = []
}
