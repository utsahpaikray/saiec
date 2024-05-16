import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TicketsTableComponent } from './tickets-table.component'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { Ticket, TicketsConnection } from '@core/generated/types'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { HttpClientModule } from '@angular/common/http'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { Viewports } from '@core/interfaces/breakpoint.enum'
import { TranslocoService } from '@ngneat/transloco'

export const mockTickets = {
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
  totalCount: 1000,
  __typename: 'TicketsConnection'
} as TicketsConnection

const siteId = 'testSiteId'

const dateOptions = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium'
})

const expectedTickets = mockTickets.nodes

describe('TicketsTableComponent', () => {
  let component: TicketsTableComponent
  let fixture: ComponentFixture<TicketsTableComponent>
  let windowResizeService: WindowResizeService
  let translocoService: TranslocoService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsTableComponent, HttpClientModule, getTranslocoModule()],
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

    fixture = TestBed.createComponent(TicketsTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    windowResizeService = TestBed.inject(WindowResizeService)
    translocoService = TestBed.inject(TranslocoService)
  })

  it('show no tickets text', async () => {
    component.tickets = []

    fixture.detectChanges()
    await fixture.whenStable()

    const noOpenTicketsText = fixture.debugElement.query(
      By.css('[data-testid="no-tickets-text"]')
    )
    expect(noOpenTicketsText).toBeTruthy()

    const ticketsTable = fixture.debugElement.query(
      By.css('[data-testid="tickets-table"]')
    )
    expect(ticketsTable).toBeFalsy()
  })

  describe('on desktop', () => {
    beforeEach(() => {
      component.breakpoint$ = of(Viewports.Desktop)
      component.tickets = mockTickets.nodes as Ticket[]
      component.ngOnInit()
      fixture.detectChanges()
    })

    it('show tickets correctly in table', async () => {
      await fixture.whenStable()

      const tableRows = fixture.debugElement.queryAll(
        By.css('[data-testid="tickets-table-row"]')
      )
      const collapsible = fixture.debugElement.query(
        By.css('[data-testid="tickets-collapsible"]')
      )
      expect(tableRows.length).toEqual(3)
      expect(collapsible).toBeFalsy()

      // show first ticket data correctly
      if (!expectedTickets) return
      expect(tableRows[0].children[0].nativeElement.innerText).toBe(
        expectedTickets[0].title
      )
      expect(tableRows[0].children[1].nativeElement.innerText).toBe(
        expectedTickets[0].priority
      )
      expect(tableRows[0].children[2].nativeElement.innerText).toBe(
        expectedTickets[0].id
      )
      expect(
        tableRows[0].children[3].nativeElement.innerText.toLowerCase()
      ).toBe(expectedTickets[0].issueType.toLowerCase())

      const expectedReportDate = new Date(expectedTickets[0].reportDate)

      expect(tableRows[0].children[4].nativeElement.innerText).toBe(
        dateOptions.format(expectedReportDate)
      )
      expect(tableRows[0].children[5].nativeElement.innerText).toBe(
        expectedTickets[0].sourceState
      )

      // show customer priority if no priority
      expect(tableRows[2].children[1].nativeElement.innerText).toBe(
        expectedTickets[0].customerPriority
      )
    })

    it('show correct headers', async () => {
      fixture.detectChanges()
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="tickets-table-header"]')
      )
      expect(tableHeaders.length).toEqual(6)
      tableHeaders.forEach((header, i) => {
        const translationKey = 'General.' + component.headers[i]
        expect(header.nativeElement.innerText).toBe(
          translocoService.translate(translationKey)
        )
      })
    })

    it('redirect user to ticket details page on table row click', () => {
      const firstTableRow = fixture.debugElement.queryAll(
        By.css('[data-testid="tickets-table-row"]')
      )[0]

      if (!mockTickets.nodes) return
      expect(
        firstTableRow.nativeElement.getAttribute('ng-reflect-router-link')
      ).toBe(`${mockTickets.nodes[0].id}`)
    })
  })

  describe('on mobile', () => {
    beforeEach(() => {
      component.breakpoint$ = of(Viewports.Mobile)
      component.tickets = mockTickets.nodes as Ticket[]
      component.ngOnInit()
      fixture.detectChanges()
    })

    it('show tickets in collapsible', async () => {
      await fixture.whenStable()

      const tableRow = fixture.debugElement.query(
        By.css('[data-testid="tickets-table-row"]')
      )
      const collapsibles = fixture.debugElement.queryAll(
        By.css('[data-testid="tickets-collapsible"]')
      )
      expect(tableRow).toBeFalsy()
      expect(collapsibles.length).toBe(3)

      // show first ticket data correctly
      if (!expectedTickets) return
      const expectedReportDate = new Date(expectedTickets[0].reportDate)
      expect(collapsibles[0].children[0].nativeElement.innerText).toBe(
        expectedTickets[0].title + '\n' + expectedTickets[0].sourceState
      )
      expect(collapsibles[0].children[2].nativeElement.innerText.trim()).toBe(
        expectedTickets[0].priority
      )
      expect(collapsibles[0].children[4].nativeElement.innerText).toBe(
        expectedTickets[0].id
      )
      expect(
        collapsibles[0].children[6].nativeElement.innerText.trim().toLowerCase()
      ).toBe(expectedTickets[0].issueType.toLowerCase())
      expect(collapsibles[0].children[8].nativeElement.innerText.trim()).toBe(
        dateOptions.format(expectedReportDate)
      )
    })

    it('show correct header', async () => {
      await fixture.whenStable()

      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="tickets-table-header"]')
      )
      expect(tableHeaders.length).toEqual(1)

      tableHeaders.forEach((header, i) => {
        expect(header.nativeElement.innerText).toBe(component.headers[i])
      })
    })

    it('redirect user to ticket details page when clicks on view ticket button', () => {
      const firstViewTicketButton = fixture.debugElement.queryAll(
        By.css('[data-testid="view-ticket-button"]')
      )[0]

      if (!mockTickets.nodes) return
      expect(
        firstViewTicketButton.nativeElement.getAttribute(
          'ng-reflect-router-link'
        )
      ).toBe(`${mockTickets.nodes[0].id}`)
    })
  })
})
