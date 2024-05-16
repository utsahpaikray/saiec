import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { TicketsConnection } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { OpenTicketsComponent } from './open-tickets.component'
import { SiteTicketsGQL } from '../../../core/tickets/graphql/site-tickets.graphql-gen'

const mockOpenTickets = {
  nodes: [
    {
      id: 'V-447505',
      title: 'Crane 4 constantly goes into error',
      state: '',
      sourceState: 'In Progress',
      priority: 'Low',
      customerPriority: 'High',
      reportDate: '2023-03-31T00:00:00.000Z',
      issueType: 'INCIDENT',
      url: 'https://dos.dev.vanderlande.com/maximo/ui/maximo.jsp?event=loadappvalue=VIVIEWSRuniqueid=501116',
      __typename: 'Ticket'
    },
    {
      id: 'V-337505',
      title: 'Crane 123456789 constantly goes into error',
      state: '',
      sourceState: 'New',
      priority: 'Medium',
      customerPriority: '',
      reportDate: '2023-03-27T13:43:35.141Z',
      issueType: 'INCIDENT',
      url: 'https://dos.dev.vanderlande.com/maximo/ui/maximo.jsp?event=loadappvalue=VIVIEWSRuniqueid=501116',
      __typename: 'Ticket'
    },
    {
      id: 'V-3333333',
      title: 'Crane 25 sometimes goes into error',
      state: 'Resolved',
      sourceState: 'Resolved',
      priority: '',
      customerPriority: 'High',
      reportDate: '2023-03-07T14:52:52.491Z',
      issueType: 'SERVICEREQUEST',
      url: 'https://dos.dev.vanderlande.com/maximo/ui/maximo.jsp?event=loadappvalue=VIVIEWSRuniqueid=501116',
      __typename: 'Ticket'
    }
  ],
  pageInfo: {
    hasNextPage: true,
    endCursor: 'Mjk=',
    __typename: 'PageInfo'
  },
  totalCount: 30,
  __typename: 'TicketsConnection'
} as TicketsConnection

const siteId = 'testSiteId'

describe('OpenTicketsComponent', () => {
  let component: OpenTicketsComponent
  let fixture: ComponentFixture<OpenTicketsComponent>
  let controller: ApolloTestingController
  let siteTicketsQuery: SiteTicketsGQL

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OpenTicketsComponent,
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
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(OpenTicketsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    controller = TestBed.inject(ApolloTestingController)
    siteTicketsQuery = TestBed.inject(SiteTicketsGQL)
  })

  it('show open tickets table and load more button', () => {
    component.openTickets$ = of(mockOpenTickets)
    component.endCursor$ = of(mockOpenTickets.pageInfo.endCursor as string)
    component.hasMoreOpenTickets$ = of(mockOpenTickets.pageInfo.hasNextPage)
    component.loading$ = of(false)
    fixture.detectChanges()

    const openTicketsTable = fixture.debugElement.query(
      By.css('[data-testid="open-tickets-table"]')
    )
    const loadMoreButton = fixture.debugElement.query(
      By.css('[data-testid="open-tickets-load-more"]')
    )
    expect(openTicketsTable).toBeTruthy()
    expect(loadMoreButton).toBeTruthy()
  })

  it('show not open tickets table', () => {
    component.openTickets$ = of({} as TicketsConnection)
    fixture.detectChanges()

    const openTicketsTable = fixture.debugElement.query(
      By.css('[data-testid="open-tickets-table"]')
    )
    expect(openTicketsTable).toBeFalsy()
  })

  it('show not load more button', () => {
    component.openTickets$ = of({
      nodes: [],
      pageInfo: mockOpenTickets.pageInfo,
      totalCount: 0
    })
    fixture.detectChanges()

    const loadMoreButton = fixture.debugElement.query(
      By.css('[data-testid="open-tickets-load-more"]')
    )
    expect(loadMoreButton).toBeFalsy()
  })

  it('show loading spinner', async () => {
    component.loading$ = of(true)
    fixture.detectChanges()
    await fixture.whenStable()

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid="loading-spinner"]')
    )
    expect(loadingSpinner).toBeTruthy()
  })

  it('do not show loading spinner', () => {
    component.openTickets$ = of(mockOpenTickets)
    component.loading$ = of(false)
    fixture.detectChanges()

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid="loading-spinner"]')
    )
    expect(loadingSpinner).toBeFalsy()
  })
})
