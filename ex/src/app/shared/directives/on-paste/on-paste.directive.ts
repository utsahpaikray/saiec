import { Directive, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[appOnPaste]',
  standalone: true
})
export class OnPasteDirective {
  @Output() pasted = new EventEmitter<File[]>()

  @HostListener('paste', ['$event'])
  async onPaste(event: ClipboardEvent) {
    const files = event.clipboardData?.files
    if (files && files.length > 0) {
      event.preventDefault()
      this.pasted.emit(Array.from(files))
    }
  }
}
