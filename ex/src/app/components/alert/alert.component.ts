import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Alert } from './alert.model'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  /**
   * The alert object with all the necessary data.
   */
  @Input()
  alert?: Alert

  /**
   * Can alert be removed?
   */
  @Input()
  isDismissible: boolean

  /**
   * click handler
   */
  @Output()
  remove = new EventEmitter<void>()

  public get icon(): string {
    switch (true) {
      case this.alert?.variant === 'success':
        return 'check-circle'

      case this.alert?.variant === 'error':
        return 'x-circle'

      case this.alert?.variant === 'warning':
        return 'exclamation'

      default:
        return 'information-circle'
    }
  }

  public get iconClass(): string {
    switch (true) {
      case this.alert?.variant === 'success':
        return 'text-green-500'

      case this.alert?.variant === 'error':
        return 'text-red-500'

      case this.alert?.variant === 'warning':
        return 'text-orange-500'

      default:
        return 'text-blue-700'
    }
  }

  public get variantClass(): string {
    switch (true) {
      case this.alert?.variant === 'success':
        return 'bg-green-100'

      case this.alert?.variant === 'error':
        return 'bg-red-100'

      case this.alert?.variant === 'warning':
        return 'bg-yellow-100'

      default:
        return 'bg-steelblue-50'
    }
  }

  /**
   * Set url for either external link, or link with prefix.
   * If internal and no prefix, url is relative to current route
   * @returns {string}
   */
  //TODO:Turn this into a pipe/service in the future (similar use on alert component)
  public setUrl(url: string): string {
    // Regular expression to check if string is email
    const emailRegexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
    if (emailRegexExp.test(url)) {
      return `mailto:${url}`
    }

    return url
  }
}
