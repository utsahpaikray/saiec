import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  SitePerformanceComponent,
  SitePerformanceVM
} from './components/site-performance/site-performance.component'
import {
  SiteNewsComponent,
  SiteNewsVM
} from './components/site-news/site-news.component'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { SiteHomeService } from './site-home.service'

export interface SiteHomeVM {
  name: string
  sitePerformanceVM?: SitePerformanceVM
  siteNewsVM: SiteNewsVM
}

@Component({
  selector: 'app-site-home',
  standalone: true,
  imports: [
    CommonModule,
    SitePerformanceComponent,
    SiteNewsComponent,
    TitleModule,
    TranslocoRootModule
  ],
  templateUrl: './site-home.component.html',
  styleUrls: ['./site-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHomeComponent {
  @HostBinding('class') class = 'd-flex flex-col gap-l'

  private siteHomeService = inject(SiteHomeService)
  public vm$ = this.siteHomeService.getVM$()
}
