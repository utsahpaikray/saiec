import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

export interface SiteNewsCard {
  labels: {
    tag?: string
    title: string
    content: string
  }
  image?: {
    src: string
    alt: string
  }
  action?: {
    label: string
    link: string
  }
}

export interface SiteNewsVM {
  cards: SiteNewsCard[]
}

@Component({
  selector: 'app-site-news',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  templateUrl: './site-news.component.html',
  styleUrls: ['./site-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteNewsComponent {
  @HostBinding('class') class = 'd-flex gap-m <md:flex-col'

  @Input()
  public vm: SiteNewsVM

  public openExternalLink(link: string): void {
    window.open(link, '_blank')
  }
}
