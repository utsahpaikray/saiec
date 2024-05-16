import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject
} from '@angular/core'
import { DIALOG_DATA, DIALOG_REF } from '@core/dialog/dialog.service'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { TranslocoModule } from '@ngneat/transloco'

export interface ConfirmationModalVM {
  title: string
  message: string
  confirm: string
  cancel: string
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoModule, TranslocoRootModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfirmationModalComponent {
  public dialogRef = inject(DIALOG_REF)
  public dialogData: ConfirmationModalVM = inject(DIALOG_DATA)
}
