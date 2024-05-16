import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core'

@Component({
  selector: 'app-crumbtrail',
  templateUrl: './crumbtrail.component.html',
  styleUrls: ['./crumbtrail.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbtrailComponent {}
