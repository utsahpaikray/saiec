import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject
} from '@angular/core'
import { Store } from '@ngrx/store'
import clipboardActions from '@stores/clipboard/clipboard.actions'
@Directive({
  selector: '[appCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {
  private elementRef = inject(ElementRef)
  @Input('appCopyToClipboard')
  public value?: string

  private store = inject(Store)

  @HostListener('click')
  public onClick() {
    const value = this.value ?? this.elementRef.nativeElement.textContent
    this.store.dispatch(clipboardActions.copyToClipBoard({ text: value }))
  }
}
