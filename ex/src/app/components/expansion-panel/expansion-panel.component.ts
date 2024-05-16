import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core'

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnChanges {
  /**
   * Content reference
   */
  @ViewChild('content') contentRef!: ElementRef

  @Input()
  isOpen = false

  @Output()
  toggleEvent = new EventEmitter<boolean>()

  constructor() {}

  /**
   * On change run open/close animation
   */
  ngOnChanges(): void {
    if (this.contentRef) {
      this.openCloseAnimation()
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen

    this.openCloseAnimation()
    this.toggleEvent.emit(this.isOpen)
  }

  openCloseAnimation() {
    this.contentRef.nativeElement.style.height = `${this.contentRef.nativeElement.scrollHeight}px`
    const timer = this.isOpen ? 300 : 0

    setTimeout(() => {
      this.contentRef.nativeElement.style.height = null
    }, timer)
  }
}
