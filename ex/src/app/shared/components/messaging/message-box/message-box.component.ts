import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

export interface MessageBoxVM {
  disabled?: boolean
  rows?: number
}

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule, ReactiveFormsModule],
  templateUrl: './message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageBoxComponent {
  @Input() public vm: MessageBoxVM = {
    disabled: false
  }

  @Output() public sendMessage = new EventEmitter<string>()

  @HostBinding('class')
  public hostClass = 'relative'

  public control = new FormControl<string>('', [Validators.required])

  sendMessageHandler(messageContent: HTMLTextAreaElement) {
    this.sendMessage.emit(messageContent.value)
    messageContent.value = ''
  }
}
