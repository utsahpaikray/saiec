import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core'
import { TranslocoModule } from '@ngneat/transloco'
import { TOAST_DATA, TOAST_REF } from '../toasts.service'

export enum ToastType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

export interface ToastVM {
  messageKey: string
  type: ToastType
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './toast.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastComponent {
  public toastRef = inject(TOAST_REF)
  public toastData: ToastVM = inject(TOAST_DATA)
}
