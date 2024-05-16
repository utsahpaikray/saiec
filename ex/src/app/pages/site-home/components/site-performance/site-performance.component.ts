import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DonutChartVariant } from '@vanderlande-gravity/components'

export interface SitePerformanceVM {
  labels: {
    title: string
  }
  button: {
    label: string
    href: string
    appName: string
  }
  filter: {
    value?: number
    options: {
      label: string
      value: number
    }[]
  }
  charts: {
    labels: {
      title: string
      value: string
      explanation: string
    }
    variant: DonutChartVariant
    maxValue: number
    value: number
    explanationValue: number
  }[]
}

@Component({
  selector: 'app-site-performance',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  templateUrl: './site-performance.component.html',
  styleUrls: ['./site-performance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SitePerformanceComponent {
  @Input() public vm: SitePerformanceVM
}
