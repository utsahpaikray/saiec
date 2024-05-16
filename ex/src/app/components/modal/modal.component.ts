import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core'
import { ModalService } from './modal.service'

import { WindowScrollService } from '@core/window-scroll/window-scroll.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  /**
   * Id of modal
   */
  @Input() id: string

  /**
   * Modal reference
   */
  @ViewChild('modal') modalRef!: ElementRef

  /**
   * How large should the modal be?
   */
  @Input() size: 'small' | 'large' = 'small'

  /**
   * Is modal open?
   */
  @Input()
  isOpen = false

  /**
   * Modal title?
   */
  @Input()
  title: string

  /**
   * close handler
   */
  @Output()
  closeEvent = new EventEmitter<void>()

  private element: any
  private removeKeydownListener: () => void

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private windowScroll: WindowScrollService,
    private renderer: Renderer2
  ) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    if (!this.id) {
      return
    }

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this)
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.close()
    this.modalService.remove(this.id)
    this.element.remove()

    if (this.removeKeydownListener) {
      this.removeKeydownListener()
    }
  }

  // open modal
  open(): void {
    this.isOpen = true
    this.bindKeydownListener()
    this.windowScroll.enable()
  }

  // close modal
  close(): void {
    this.isOpen = false
    this.windowScroll.disable()
    this.closeEvent.emit()

    if (this.removeKeydownListener) {
      this.removeKeydownListener()
      return
    }
  }

  // close through overlay
  onCloseOverlay(event: Event): void {
    if (!this.modalRef.nativeElement.contains(event.target)) {
      this.close()
    }
  }

  /**
   * Close modal on keydown escape event
   */
  private bindKeydownListener(): void {
    this.removeKeydownListener = this.renderer.listen(
      'document',
      'keydown.escape',
      () => {
        this.close()
      }
    )
  }
}
