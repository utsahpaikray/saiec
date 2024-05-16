import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

@Component({
  selector: 'app-load-more-paginator',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  templateUrl: './load-more-paginator.component.html'
})
export class LoadMorePaginatorComponent {
  @Input()
  number: number

  @Input()
  total: number
}
