import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { TranslocoModule } from '@ngneat/transloco'

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPageComponent {
  @HostBinding('class') class = 'd-flex flex-col gap-m m-auto p-m'
}
