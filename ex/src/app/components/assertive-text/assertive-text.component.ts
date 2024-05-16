import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-assertive-text',
  templateUrl: './assertive-text.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AssertiveTextComponent {
  @Input()
  leftText?: string

  @Input()
  rightText?: string
}
