import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent {
  /**
   * Variants of link
   */
  @Input()
  variant: 'primary' | 'secondary' = 'primary'

  /**
   * How large should the button be?
   */
  @Input()
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base'

  /**
   * Should the link have target=_blank to open in a new tab? (this property is done specifically
   * for internal links that still want to open in a new tab)
   */
  @Input()
  hasLinkTargetBlank: boolean = false

  /**
   * link content
   */
  @Input()
  linkText?: string

  /**
   * link url
   */
  @Input()
  linkUrl?: string

  /**
   * icon name
   */
  @Input()
  iconName?: string

  /**
   * Position of icon if any
   */
  @Input()
  iconPosition?: 'left' | 'right'

  public get classes(): string[] {
    return [`group link-${this.variant}`, `link-${this.size}`]
  }

  public get iconClasses(): string {
    return `link-icon-${this.variant}`
  }
}
