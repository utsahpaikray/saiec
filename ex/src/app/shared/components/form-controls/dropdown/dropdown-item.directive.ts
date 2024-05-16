import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject
} from '@angular/core'

export const EVENT_NAME = 'appDropdownItemSelected'
export type DropdownItemEvent<T = unknown> = CustomEvent<T>

@Directive({
  selector: '[appDropdownItem]'
})
export class DropdownItemDirective<T> {
  private elementRef = inject(ElementRef)

  @Input('appDropdownItem')
  public value!: T
  @HostListener('click', ['$event'])
  public onClick() {
    if (this.elementRef) {
      this.elementRef.nativeElement.dispatchEvent(
        new CustomEvent<T>(EVENT_NAME, {
          bubbles: true,
          detail: this.value
        })
      )
    }
  }
}
