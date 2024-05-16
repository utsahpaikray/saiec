import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostBinding,
  Input
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { StatusDirective } from '@shared/directives/status/status.directive'
import { CasesTableVM } from './cases-table.interface'

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule, StatusDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CasesTableComponent {
  @HostBinding('class') class = 'd-block mt-s'

  @Input() vm: CasesTableVM | null = null
}
