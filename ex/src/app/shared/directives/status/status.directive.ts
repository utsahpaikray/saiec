import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core'

export enum TagStatus {
  action = 'action',
  warning = 'warning',
  success = 'success',
  error = 'error',
  info = '' // default
}

export enum StatusIcon {
  star = 'star',
  warning = 'warning',
  success = 'success',
  error = 'error'
}

const mapStatusToIcon = (status: TagStatus) =>
  ({
    [TagStatus.action]: StatusIcon.star,
    [TagStatus.warning]: StatusIcon.warning,
    [TagStatus.success]: StatusIcon.success,
    [TagStatus.error]: StatusIcon.error,
    [TagStatus.info]: StatusIcon.star
  })[status]

@Directive({
  selector: '[appStatus]',
  standalone: true
})
export class StatusDirective implements OnChanges {
  @Input('appStatus') public currentStatus: TagStatus = TagStatus.info

  private elementRef = inject(ElementRef)

  ngOnChanges(): void {
    Object.values(TagStatus).forEach((status) => {
      if (this.elementRef.nativeElement.tagName.toLowerCase() !== 'grav-tag') {
        throw new Error(
          'appStatus directive can only be used on grav-tag elements'
        )
      }

      this.elementRef.nativeElement.removeAttribute(`grav-${status}`)
    })

    this.elementRef.nativeElement.setAttribute(`grav-${this.currentStatus}`, '')

    const icon =
      this.elementRef.nativeElement.querySelector('grav-svg-icon') ??
      document.createElement('grav-svg-icon') // gravity icon
    icon.setAttribute('key', mapStatusToIcon(this.currentStatus))

    this.elementRef.nativeElement.prepend(icon)
  }
}
