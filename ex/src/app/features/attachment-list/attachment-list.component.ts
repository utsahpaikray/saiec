import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { DocumentInputType } from './attachment-list.interface'

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AttachmentListComponent {
  @Input() attachments: Partial<DocumentInputType>[] = []

  @Output()
  remove = new EventEmitter<string>()
}
