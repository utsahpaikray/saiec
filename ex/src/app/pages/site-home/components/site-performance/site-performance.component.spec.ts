import { ComponentFixture, TestBed } from '@angular/core/testing'

import {
  SitePerformanceComponent,
  SitePerformanceVM
} from './site-performance.component'
import { CommonTimespans } from '@pages/site-home/site-home.service'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoLocaleModule } from '@ngneat/transloco-locale'

const mockVM: SitePerformanceVM = {
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
        label: 'Dashboard.SitePerformance.Filters.1D',
        value: CommonTimespans.Day
      },
      {
        label: 'Dashboard.SitePerformance.Filters.7D',
        value: CommonTimespans.Week
      },
      {
        label: 'Dashboard.SitePerformance.Filters.30D',
        value: CommonTimespans.Month
      },
      {
        label: 'Dashboard.SitePerformance.Filters.1Y',
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
        title: 'Dashboard.SitePerformance.Charts.Availability.Title',
        value: 'Dashboard.SitePerformance.Charts.Availability.Value',
        explanation: 'Dashboard.SitePerformance.Charts.Availability.Explanation'
      },
      variant: 'success',
      maxValue: 100,
      value: 91.14,
      explanationValue: 23
    },
    {
      labels: {
        title: 'Dashboard.SitePerformance.Charts.Throughput.Title',
        value: 'Dashboard.SitePerformance.Charts.Throughput.Value',
        explanation: 'Dashboard.SitePerformance.Charts.Throughput.Explanation'
      },
      variant: 'warning',
      maxValue: 100,
      value: 50.14,
      explanationValue: 23
    },
    {
      labels: {
        title: 'Dashboard.SitePerformance.Charts.Performance.Title',
        value: 'Dashboard.SitePerformance.Charts.Performance.Value',
        explanation: 'Dashboard.SitePerformance.Charts.Performance.Explanation'
      },
      variant: 'error',
      maxValue: 100,
      value: 70.14,
      explanationValue: 23
    }
  ]
}

describe('SitePerformanceComponent', () => {
  let component: SitePerformanceComponent
  let fixture: ComponentFixture<SitePerformanceComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SitePerformanceComponent,
        getTranslocoModule(),
        TranslocoLocaleModule.forRoot()
      ]
    })
    fixture = TestBed.createComponent(SitePerformanceComponent)
    component = fixture.componentInstance
    component.vm = mockVM
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should render static elements', () => {
    const heading = fixture.nativeElement.querySelector('[role="heading"]')
    const title = heading.querySelector('[role="title"]')
    const button = heading.querySelector('[role="button"]')
    const filter = heading.querySelector('[role="filter"]')
    const filterOptions = filter.querySelectorAll('[role="option"]')
    expect(heading).toBeTruthy()
    expect(title).toBeTruthy()
    expect(button).toBeTruthy()
    expect(filter).toBeTruthy()
    expect(filterOptions.length).toEqual(mockVM.filter.options.length)
  })
  it('should render cards with charts', () => {
    const cards: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('[role="card"]')
    expect(cards.length).toEqual(mockVM.charts.length)
    cards.forEach((card, index) => {
      const title = card.querySelector('[role="title"]')
      const value = card.querySelector('[role="value"]')
      const explanation = card.querySelector('[role="explanation"]')
      const chart = card.querySelector<
        HTMLElement & { value: number; maxValue: number }
      >('[role="chart"]')
      const vm = mockVM.charts[index]
      expect(title).toBeTruthy()
      expect(chart?.value).toEqual(vm.value)
      expect(chart?.maxValue).toEqual(vm.maxValue)
      expect(value).toBeTruthy()
      expect(explanation).toBeTruthy()
      expect(value?.textContent?.trim()).toContain(vm.value.toString())
      expect(explanation?.textContent?.trim()).toContain(
        vm.explanationValue.toString()
      )
    })
  })
})
