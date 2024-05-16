import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SiteHomeComponent, SiteHomeVM } from './site-home.component'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoLocaleModule } from '@ngneat/transloco-locale'
import { of } from 'rxjs'
import { SiteHomeService } from './site-home.service'
import { SitePerformanceComponent } from './components/site-performance/site-performance.component'
import { SiteNewsComponent } from './components/site-news/site-news.component'

const mockVM: SiteHomeVM = {
  name: 'mock-name',
  sitePerformanceVM: {
    labels: {
      title: 'mock-title'
    },
    button: {
      label: 'mock-label',
      href: 'https://mock-href',
      appName: 'mock-app-name'
    },
    filter: {
      value: 1,
      options: [
        {
          label: 'mock-label',
          value: 1
        }
      ]
    },
    charts: [
      {
        labels: {
          title: 'mock-title',
          value: 'mock-value',
          explanation: 'mock-explanation'
        },
        variant: 'success',
        maxValue: 1,
        value: 1,
        explanationValue: 1
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
      }
    ]
  }
}

describe('SiteHomeComponent', () => {
  let component: SiteHomeComponent
  let fixture: ComponentFixture<SiteHomeComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SiteHomeComponent,
        getTranslocoModule(),
        TranslocoLocaleModule.forRoot()
      ],
      providers: [
        {
          provide: SiteHomeService,
          useValue: {
            getVM$: () => of(mockVM)
          }
        }
      ]
    })
    fixture = TestBed.createComponent(SiteHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should render static elements', () => {
    const siteTitle = fixture.nativeElement.querySelector('[role="title"]')
    const sitePerformance: SitePerformanceComponent | null =
      fixture.nativeElement.querySelector('[role="performance"]')
    const siteNews: SiteNewsComponent | null =
      fixture.nativeElement.querySelector('[role="news"]')
    expect(siteTitle).toBeTruthy()
    expect(siteTitle.textContent).toContain(mockVM.name)
    expect(sitePerformance).toBeTruthy()
    expect(siteNews).toBeTruthy()
  })
})
