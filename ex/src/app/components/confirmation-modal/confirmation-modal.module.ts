import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ModalModule } from '@components/modal/modal.module'
import { ConfirmationModalComponent } from './confirmation-modal.component'

@NgModule({
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  imports: [CommonModule, ModalModule, TranslocoRootModule]
})
export class ConfirmationModalModule {}
