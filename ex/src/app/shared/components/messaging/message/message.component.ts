import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { LoadRemoteComponentDirective } from '@shared/directives/load-remote-component/loadRemoteComponent.directive'

export interface MessageVM {
  id: string
  author: string
  created: Date
  content: string
  authorIsCurrentUser: boolean
  messageType: MessageType
  status?: string
}

export enum MessageType {
  Status = 'status',
  Text = 'text',
  Attachment = 'attachment'
}

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule, LoadRemoteComponentDirective],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageComponent {
  @Input() public vm: MessageVM

  @HostBinding('class') class = 'd-flex'
  @HostBinding('class.justify-flex-end') get currentUserMessageAlignment() {
    return (
      this.vm.authorIsCurrentUser && this.vm.messageType !== MessageType.Status
    )
  }
  @HostBinding('class.justify-center') get statusMessageAlignment() {
    return this.vm.messageType === MessageType.Status
  }

  public MessageType = MessageType
}
