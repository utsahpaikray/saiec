import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { TicketsService } from './tickets.service'
import { TestBed } from '@angular/core/testing'
import { Subject, of } from 'rxjs'
import { SiteTicketsDocument } from './graphql/site-tickets.graphql-gen'
import { mockTickets } from '@pages/tickets-overview/tickets-table/tickets-table.component.spec'
import { mockSiteTicketContacts } from './tickets.service.mock'
import { SiteTicketContactsDocument } from './graphql/site-ticket-contacts.graphql-gen'
import {
  mockAssets,
  mockPageInfo
} from '@features/select-asset-dialog/select-asset-dialog.component.spec'
import { SiteTicketAssetSearchDocument } from '@features/select-asset-dialog/graphql/site-ticket-asset-search.graphql-gen'

describe('TicketsService', () => {
  let controller: ApolloTestingController
  let service: TicketsService

  const siteId = 'testSiteId'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule]
    }).compileComponents()

    TestBed.configureTestingModule({ providers: [TicketsService] })

    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(TicketsService)
  })

  it('should get tickets query result ', () => {
    const siteId$ = of(siteId)
    const endCursorSubject$ = new Subject<string>()
    const sourceState = 'Closed'

    service
      .getTicketsQuery(siteId$, endCursorSubject$, sourceState)
      .subscribe(({ data }) => {
        const expectedTickets = mockTickets.nodes?.map(
          ({ __typename, ...rest }) => rest
        )
        expect(data.tickets?.nodes).toEqual(expectedTickets)
        expect(data.tickets?.totalCount).toBe(mockTickets.totalCount)
      })

    const op = controller.expectOne(SiteTicketsDocument)
    expect(op.operation.operationName).toEqual('siteTickets')

    op.flushData({
      tickets: mockTickets
    })

    controller.verify()
  })

  it('should get asset search result', () => {
    const searchText = 'text'
    const skip = 0

    service
      .getAssetSearchResult(siteId, searchText, skip)
      .subscribe(({ data }) => {
        const expectedAssets = mockAssets.map(({ __typename, ...rest }) => rest)
        expect(data.assetSearch?.items).toEqual(expectedAssets)
        expect(data.assetSearch?.totalCount).toBe(mockTickets.totalCount)
      })

    const op = controller.expectOne(SiteTicketAssetSearchDocument)
    expect(op.operation.operationName).toEqual('siteTicketAssetSearch')

    op.flushData({
      assetSearch: {
        items: [...mockAssets],
        pageInfo: { ...mockPageInfo },
        totalCount: 1000
      }
    })

    controller.verify()
  })

  it('should get site ticket contacts', () => {
    const siteId$ = of(siteId)

    service.getSiteTicketContacts(siteId$).subscribe(({ data }) => {
      const expectedTickets = mockSiteTicketContacts.contacts.map(
        ({ __typename, ...rest }) => rest
      )
      expect(data.ticketingSiteInfo.contacts).toEqual(expectedTickets)
    })

    const op = controller.expectOne(SiteTicketContactsDocument)
    expect(op.operation.operationName).toEqual('siteTicketContacts')

    op.flushData({
      ticketingSiteInfo: mockSiteTicketContacts
    })

    controller.verify()
  })
})
