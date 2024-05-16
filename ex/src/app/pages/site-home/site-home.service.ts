import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { DonutChartVariant } from '@vanderlande-gravity/components'
import { Observable, map, shareReplay, startWith, withLatestFrom } from 'rxjs'
import { SiteHomeVM } from './site-home.component'
import { SiteNewsCard } from './components/site-news/site-news.component'
import { TranslocoService } from '@ngneat/transloco'
import { environment } from '@environments/environment'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'
import { filterNull } from '@stores/operators'
import { SiteSegment } from '@stores/site-details/interfaces/site-detail.interface'

export enum CommonTimespans {
  MSec = 1,
  Sec = 1000 * CommonTimespans.MSec,
  Min = 60 * CommonTimespans.Sec,
  Hour = 60 * CommonTimespans.Min,
  Day = 24 * CommonTimespans.Hour,
  Week = 7 * CommonTimespans.Day,
  Month = 30 * CommonTimespans.Day,
  Year = 365 * CommonTimespans.Day
}

const mapVariant = (value: number): DonutChartVariant => {
  if (value < 51) {
    return 'error'
  } else if (value < 75) {
    return 'warning'
  } else {
    return 'success'
  }
}

const segmentToCard = (
  segment: SiteSegment | null,
  newsAndInsightsLink: string
): SiteNewsCard | null => {
  switch (segment) {
    case SiteSegment.Warehousing:
    case SiteSegment.Amazon:
      return {
        labels: {
          title: 'Dashboard.WarehouseTitle',
          content: 'Dashboard.WarehouseDesc'
        },
        image: {
          src: '/assets/images/business-unit-warehouse.jpg',
          alt: 'warehouse-image'
        },
        action: {
          label: 'Dashboard.ReadMore',
          link: newsAndInsightsLink
        }
      }
    case SiteSegment.Airports:
      return {
        labels: {
          title: 'Dashboard.AirportTitle',
          content: 'Dashboard.AirportDesc'
        },
        image: {
          src: '/assets/images/business-unit-airport.jpg',
          alt: 'airport-image'
        },
        action: {
          label: 'Dashboard.ReadMore',
          link: newsAndInsightsLink
        }
      }
    case SiteSegment.Parcel:
      return {
        labels: {
          title: 'Dashboard.ParcelTitle',
          content: 'Dashboard.ParcelDesc'
        },
        image: {
          src: '/assets/images/business-unit-parcel.jpg',
          alt: 'parcel-image'
        },
        action: {
          label: 'Dashboard.ReadMore',
          link: newsAndInsightsLink
        }
      }
    default:
      return null
  }
}

const mapLangToNewsInsightsLink = (lang: string): string => {
  const languageKey = lang.split('-')[0].toUpperCase()
  switch (languageKey) {
    case 'EN':
      return `${environment.newsLinkUrl}news`
    case 'DE':
      return `${environment.newsLinkUrl}de/nachrichten`
    case 'FR':
      return `${environment.newsLinkUrl}fr/nouvelles`
    case 'ES':
      return `${environment.newsLinkUrl}es/noticias`
    case 'RU':
      return `${environment.newsLinkUrl}ru/информация`
    case 'ZH':
      return `${environment.newsLinkUrl}cn/新闻动态`
    default:
      return `${environment.newsLinkUrl}news`
  }
}

@Injectable({
  providedIn: 'root'
})
export class SiteHomeService {
  private translocoService = inject(TranslocoService)
  private newsAndInsightsLink$ = this.translocoService.langChanges$.pipe(
    startWith(this.translocoService.getActiveLang()),
    map(mapLangToNewsInsightsLink),
    shareReplay(1)
  )
  private store = inject(Store)
  private segments$ = this.store
    .select(siteDetailFeature.selectSegments)
    .pipe(filterNull())
  private user$ = this.store.select(currentUserFeature.selectCurrentUser)
  public getVM$(): Observable<SiteHomeVM> {
    return this.segments$.pipe(
      withLatestFrom(this.newsAndInsightsLink$, this.user$),
      map(([segments, newsAndInsightsLink, user]) => ({
        name: user?.name || '',
        sitePerformanceVM: environment.production
          ? undefined
          : {
              labels: {
                title: 'Dashboard.SitePerformance.Title'
              },
              button: {
                label: 'Dashboard.SitePerformance.Button',
                href: 'about:blank',
                appName: 'VIDI'
              },
              filter: {
                value: CommonTimespans.Day,
                options: [
                  {
                    label: 'Dashboard.SitePerformance.Filters.OneDay',
                    value: CommonTimespans.Day
                  },
                  {
                    label: 'Dashboard.SitePerformance.Filters.SevenDays',
                    value: CommonTimespans.Week
                  },
                  {
                    label: 'Dashboard.SitePerformance.Filters.ThirtyDays',
                    value: CommonTimespans.Month
                  },
                  {
                    label: 'Dashboard.SitePerformance.Filters.OneYear',
                    value: CommonTimespans.Year
                  },
                  {
                    label: 'Dashboard.SitePerformance.Filters.ALL',
                    value: Infinity
                  }
                ]
              },
              charts: [
                {
                  labels: {
                    title:
                      'Dashboard.SitePerformance.Charts.Availability.Title',
                    value:
                      'Dashboard.SitePerformance.Charts.Availability.Value',
                    explanation:
                      'Dashboard.SitePerformance.Charts.Availability.Explanation'
                  },
                  variant: mapVariant(91.14),
                  maxValue: 100,
                  value: 91.14,
                  explanationValue: 23
                },
                {
                  labels: {
                    title: 'Dashboard.SitePerformance.Charts.Throughput.Title',
                    value: 'Dashboard.SitePerformance.Charts.Throughput.Value',
                    explanation:
                      'Dashboard.SitePerformance.Charts.Throughput.Explanation'
                  },
                  variant: mapVariant(50.14),
                  maxValue: 100,
                  value: 50.14,
                  explanationValue: 23
                },
                {
                  labels: {
                    title: 'Dashboard.SitePerformance.Charts.Performance.Title',
                    value: 'Dashboard.SitePerformance.Charts.Performance.Value',
                    explanation:
                      'Dashboard.SitePerformance.Charts.Performance.Explanation'
                  },
                  variant: mapVariant(70.14),
                  maxValue: 100,
                  value: 70.14,
                  explanationValue: 23
                }
              ]
            },
        siteNewsVM: {
          cards: [
            {
              labels: {
                tag: 'Dashboard.WelcomeTag',
                title: 'Dashboard.WelcomeTitle',
                content: 'Dashboard.WelcomeDesc'
              },
              image: {
                src: '/assets/images/vanderlande-industries-companyupdate-1644024500628.png',
                alt: 'welcome-image'
              }
            },
            {
              labels: {
                tag: 'Dashboard.FeedbackTag',
                title: 'Dashboard.FeedbackTitle',
                content: 'Dashboard.FeedbackDesc'
              },
              image: {
                src: '/assets/images/istanbul-airport-vibes_12510.png',
                alt: 'feedback-image'
              }
            },
            ...[...new Set(segments)].map((segment) =>
              segmentToCard(segment, newsAndInsightsLink)
            )
          ].filter((card): card is SiteNewsCard => !!card)
        }
      }))
    )
  }
}
