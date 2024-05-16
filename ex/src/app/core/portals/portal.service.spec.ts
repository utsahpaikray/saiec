import { TestBed } from '@angular/core/testing'
import { Portal } from '@core/generated/types'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { of } from 'rxjs'

import { CurrentUserService } from '../current-user/current-user.service'
import { CurrentUserServiceMock } from '../current-user/current-user.service.mock'
import { PortalByIdDocument } from './graphql/portal-by-id.query.graphql-gen'
import {
  AccessiblePortalsGQL,
  AllPortalsDocument
} from './graphql/portals.query.graphql-gen'
import { PortalService } from './portal.service'

describe('PortalService', () => {
  let currentUserService: CurrentUserService
  let query: AccessiblePortalsGQL
  let controller: ApolloTestingController
  let service: PortalService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ]
    }).compileComponents()

    TestBed.configureTestingModule({ providers: [PortalService] })

    currentUserService = TestBed.inject(CurrentUserService)
    query = TestBed.inject(AccessiblePortalsGQL)
  })

  it('should be created', () => {
    expect(currentUserService).toBeTruthy()
  })

  //TODO Due to migration of get portals into ngrx store and changes in graphql api below test case are now deprecated, Hence it will be removed once the service are removed
  it('should query portals from portal service if super user', () => {
    spyOn(query, 'fetch').and.callThrough()
    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(PortalService)
    service.getPortals().subscribe((portals) => {
      expect(portals[0].name).toEqual('Test Portal')
      expect(portals[0].id).toEqual('testPortalId')
    })
    spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
      true
    )

    const op = controller.expectOne(AllPortalsDocument)
    expect(op.operation.operationName).toEqual('allPortals')

    op.flush({
      data: {
        portals: [
          {
            name: 'Test Portal',
            id: 'testPortalId'
          }
        ]
      }
    })

    controller.verify()
    expect(query.fetch).not.toHaveBeenCalled()
  })

  it('should get portals from current user if not super user', () => {
    spyOn(query, 'fetch').and.callThrough()
    spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
      false
    )
    spyOnProperty(currentUserService, 'userPortals$', 'get').and.returnValue(
      of([
        {
          name: 'Test User Portal',
          id: 'testUserPortalId'
        }
      ] as Portal[])
    )

    service = TestBed.inject(PortalService)
    service.getPortals().subscribe((portals) => {
      expect(portals[0].name).toEqual('Test User Portal')
      expect(portals[0].id).toEqual('testUserPortalId')
    })

    expect(query.fetch).not.toHaveBeenCalled()
  })

  it('should query portal by id', () => {
    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(PortalService)
    service.getPortalById('testPortalId').subscribe((portal) => {
      expect(portal.name).toEqual('Test Portal')
      expect(portal.id).toEqual('testPortalId')
    })

    const op = controller.expectOne(PortalByIdDocument)
    expect(op.operation.operationName).toEqual('portalById')

    op.flush({
      data: {
        portals: [
          {
            name: 'Test Portal',
            id: 'testPortalId'
          }
        ]
      }
    })

    controller.verify()
  })
})
