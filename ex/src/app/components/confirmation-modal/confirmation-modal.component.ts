import { Component, EventEmitter, Input, Output } from '@angular/core'

import { ModalService } from '@components/modal/modal.service'
import { TranslocoService } from '@ngneat/transloco'

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() public id: string
  @Input() public title: string
  @Input() public showCancelButton = true
  @Input() public confirmText =
    this.translocoService.translate('General.Confirm')
  @Input() public cancelText = this.translocoService.translate('General.Cancel')

  /**
   * Output emits whether modal was confirmed or canceld
   */
  @Output() closeEvent = new EventEmitter<boolean>()

  constructor(
    private modalService: ModalService,
    private translocoService: TranslocoService
  ) {}

  /**
   * Cancel modal
   */
  public cancel(isButton = false): void {
    this.closeEvent.emit(false)

    if (isButton) this.closeModal()
  }

  /**
   * Confirm modal
   */
  public confirm(): void {
    this.closeEvent.emit(true)
    this.closeModal()
  }

  /**
   * Close modal by clicking cancel button
   */
  private closeModal(): void {
    this.modalService.close(this.id)
  }
}
