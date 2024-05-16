import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'

@Component({
  selector: 'app-load-more',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule, ProgressSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './load-more.component.html'
})
export class LoadMoreComponent {
  /**
   * Is loading more items
   */
  @Input()
  loading: boolean

  /**
   * Has more items to be load
   */
  @Input()
  hasMore: boolean

  /**
   * Load more handler
   */
  @Output()
  loadMore = new EventEmitter<Event>()
}
