import { Component, Input, ViewChild } from '@angular/core'
import { RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-dynamic-link',
  templateUrl: './dynamic-link.component.html',
  styleUrls: ['./dynamic-link.component.scss']
})
export class DynamicLinkComponent {
  @ViewChild(RouterLinkActive) public routerLinkActive: RouterLinkActive

  /**
   * Url of the navigation item
   */
  @Input()
  url?: string | string[]

  /**
   * Is router link active state supposed to match the exact link?
   */
  @Input()
  isExact = true

  /**
   * Should the link have target=_blank to open in a new tab? (this property is done specifically
   * for internal links that still want to open in a new tab)
   */
  @Input()
  hasTargetBlank = false

  /**
   * Link classes
   */
  @Input()
  linkClass: string = ''
}
