import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ActivatedRoute } from '@angular/router'
import enData from '@assets/i18n/en-US.json'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { environment } from '@environments/environment'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { maximoFeature } from '@stores/maximo/maximo.state'
import { TabChangeEvent } from '@vanderlande-gravity/components'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'
import { TicketsOverviewComponent } from './tickets-overview.component'

const siteId = 'testSiteId'

describe('TicketsOverviewComponent', () => {
  let component: TicketsOverviewComponent
  let fixture: ComponentFixture<TicketsOverviewComponent>
  let mockStore: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TicketsOverviewComponent,
        getTranslocoModule(),
        ApolloTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId
            })
          }
        },
        provideMockStore({
          selectors: [
            {
              selector: maximoFeature.hasWriteAccessNotLoading,
              value: false
            }
          ]
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    mockStore = TestBed.inject(MockStore)
  })

  it('shows create ticket button when user has write access to maximo and navigates to create ticket page', async () => {
    mockStore.overrideSelector(maximoFeature.hasWriteAccessNotLoading, true)

    mockStore.refreshState()
    fixture.detectChanges()

    const createTicketButton = fixture.debugElement.query(
      By.css('[data-testid="create-ticket-button"]')
    )
    expect(createTicketButton).toBeTruthy()
    expect(
      createTicketButton.nativeElement.getAttribute('ng-reflect-router-link')
    ).toBe('./new')
  })

  it('do not show create ticket button', () => {
    mockStore.overrideSelector(maximoFeature.hasWriteAccessNotLoading, false)

    mockStore.refreshState()
    fixture.detectChanges()

    const createTicketButton = fixture.debugElement.query(
      By.css('[data-testid="create-ticket-button"]')
    )

    expect(createTicketButton).toBeFalsy()
  })

  it('has view all tickets button', () => {
    spyOn(window, 'open')

    const mockEvent: Event = {
      preventDefault: () => {}
    } as Event

    component.viewAllTickets(mockEvent)
    fixture.detectChanges()

    const viewAllTicketsButton = fixture.debugElement.query(
      By.css('[data-testid="view-all-tickets-button"]')
    )
    expect(viewAllTicketsButton).toBeTruthy()
    expect(window.open).toHaveBeenCalledOnceWith(
      environment.viewAllTicketsUrl,
      '_blank'
    )
  })

  it('should render open tickets component', () => {
    const openTicketsComponent = fixture.debugElement.query(
      By.css('[data-testid="open-tickets"]')
    )
    expect(openTicketsComponent).toBeTruthy()
  })

  it('should render ticket tabs', () => {
    const openTicketsCount = 10
    component.openTicketsCount$ = of(openTicketsCount)
    fixture.detectChanges()

    const openTicketsTab = fixture.debugElement.query(
      By.css('[data-testid="tab-open-tickets"]')
    )
    const allTicketsTab = fixture.debugElement.query(
      By.css('[data-testid="tab-all-tickets"]')
    )
    expect(openTicketsTab).toBeTruthy()
    expect(openTicketsTab.nativeElement.textContent.trim()).toBe(
      `${enData.Tickets.OpenTickets} (${openTicketsCount})`
    )
    expect(allTicketsTab).toBeTruthy()
  })

  it('should render all tickets component when clicks on all tickets tab', () => {
    const mockEvent: TabChangeEvent<string> = {
      detail: {
        value: 'all'
      }
    } as CustomEvent

    component.onTabChange(mockEvent)
    fixture.detectChanges()

    const openTicketsComponent = fixture.debugElement.query(
      By.css('[data-testid="open-tickets"]')
    )
    const allTicketsComponent = fixture.debugElement.query(
      By.css('[data-testid="all-tickets"]')
    )
    expect(openTicketsComponent).toBeFalsy()
    expect(allTicketsComponent).toBeTruthy()
  })
})
