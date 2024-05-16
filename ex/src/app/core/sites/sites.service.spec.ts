import { TestBed } from '@angular/core/testing'
import {
  ApolloTestingModule,
  ApolloTestingController
} from 'apollo-angular/testing'
import {
  AuthModule,
  LogLevel,
  OidcSecurityService
} from 'angular-auth-oidc-client'

import { SitesService } from './sites.service'
import {
  SiteByIdDocument,
  SiteByIdGQL
} from './graphql/site-by-id.query.graphql-gen'
import {
  UserSiteByIdDocument,
  UserSiteByIdGQL
} from './graphql/user-site-by-id.query.graphql-gen'
import { CurrentUserServiceMock } from '../current-user/current-user.service.mock'
import { CurrentUserService } from '../current-user/current-user.service'
import {
  ContactsBySiteIdDocument,
  ContactsBySiteIdGQL
} from './graphql/contacts-by-site-id.graphql-gen'
import { MockSiteContacts } from './sites.service.mock'
import { SiteProjectsSegmentDocument } from './graphql/site-projects-segment.graphql-gen'
import { UserSiteProjectsSegmentDocument } from './graphql/user-site-projects-segment.graphql-gen'
import { Segment } from '@core/generated/types'

const mockSites = [
  {
    name: 'Test Sites',
    portal: [
      {
        name: 'Test Portal',
        id: 'portal123'
      }
    ]
  }
]

const mockSiteProjectsSegment = [
  {
    segment: 'AIRPORTS',
    __typename: 'Project'
  }
]

const siteId = 'testSitesId'

describe('Sites service', () => {
  let controller: ApolloTestingController
  let service: SitesService
  let currentUserService: CurrentUserService
  let oidcSecurityService: OidcSecurityService
  let query: SiteByIdGQL
  let userQuery: UserSiteByIdGQL
  let siteContactsQuery: ContactsBySiteIdGQL

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        AuthModule.forRoot({
          config: {
            authority: 'https://keycloak-dev.evimvi.nl/auth/realms/dsf',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'portal-app',
            scope: 'openid offline_access',
            responseType: 'code',
            autoUserInfo: true,
            silentRenew: true,
            useRefreshToken: true,
            logLevel: LogLevel.Debug,
            ignoreNonceAfterRefresh: true
          }
        })
      ],
      providers: [
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ]
    }).compileComponents()

    TestBed.configureTestingModule({ providers: [SitesService] })

    oidcSecurityService = TestBed.inject(OidcSecurityService)
    controller = TestBed.inject(ApolloTestingController)
    service = TestBed.inject(SitesService)
    currentUserService = TestBed.inject(CurrentUserService)
    query = TestBed.inject(SiteByIdGQL)
    userQuery = TestBed.inject(UserSiteByIdGQL)
    siteContactsQuery = TestBed.inject(ContactsBySiteIdGQL)
  })

  describe('query site by id', () => {
    it('should query site by id if super user', () => {
      spyOn(query, 'fetch').and.callThrough()
      spyOn(userQuery, 'fetch').and.callThrough()
      spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
        true
      )
      spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
        false
      )

      service.getSiteById(siteId).subscribe((site) => {
        expect(site.name).toEqual('Test Sites')
      })

      const op = controller.expectOne(SiteByIdDocument)
      expect(op.operation.operationName).toEqual('siteById')

      op.flush({
        data: {
          sites: mockSites.slice(0)
        }
      })

      controller.verify()

      expect(query.fetch).toHaveBeenCalledWith({
        id: siteId
      })
      expect(userQuery.fetch).not.toHaveBeenCalled()
    })

    it('should query site by id if portal admin', () => {
      spyOn(query, 'fetch').and.callThrough()
      spyOn(userQuery, 'fetch').and.callThrough()
      spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
        false
      )
      spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
        true
      )

      service.getSiteById(siteId).subscribe((site) => {
        expect(site.name).toEqual('Test Sites')
      })

      const op = controller.expectOne(SiteByIdDocument)
      expect(op.operation.operationName).toEqual('siteById')

      op.flush({
        data: {
          sites: mockSites.slice(0)
        }
      })

      controller.verify()

      expect(query.fetch).toHaveBeenCalledWith({
        id: siteId
      })
      expect(userQuery.fetch).not.toHaveBeenCalled()
    })

    it('should query site by id if customer user', () => {
      spyOn(query, 'fetch').and.callThrough()
      spyOn(userQuery, 'fetch').and.callThrough()
      spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
        false
      )
      spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
        false
      )

      service.getSiteById(siteId).subscribe((site) => {
        expect(site.name).toEqual('Test Sites')
      })

      const op = controller.expectOne(UserSiteByIdDocument)
      expect(op.operation.operationName).toEqual('userSiteById')

      op.flush({
        data: {
          me: {
            relatedPortalData: {
              sites: mockSites.slice(0)
            }
          }
        }
      })

      controller.verify()

      expect(query.fetch).not.toHaveBeenCalled()
      expect(userQuery.fetch).toHaveBeenCalledWith({
        id: siteId
      })
    })
  })

  it('should query contacts by site id if super user', () => {
    spyOn(siteContactsQuery, 'fetch').and.callThrough()
    spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
      true
    )
    spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
      false
    )

    service.getSiteContacts(siteId).subscribe()

    const op = controller.expectOne(ContactsBySiteIdDocument)
    expect(op.operation.operationName).toEqual('contactsBySiteId')

    op.flushData({
      sites: [{ ...MockSiteContacts }]
    })

    controller.verify()

    expect(siteContactsQuery.fetch).toHaveBeenCalledWith({
      siteId: siteId
    })
  })

  describe('query project segments', () => {
    it('should query project segments by site id if super user', () => {
      spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
        true
      )
      spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
        false
      )

      service.getSiteProjectsSegment(siteId).subscribe(({ data }) => {
        expect(data.sites[0].projects[0].segment).toEqual(
          mockSiteProjectsSegment[0].segment as Segment
        )
      })

      const op = controller.expectOne(SiteProjectsSegmentDocument)
      expect(op.operation.operationName).toEqual('siteProjectsSegment')

      op.flushData({
        sites: [{ projects: [...mockSiteProjectsSegment], __typename: 'Site' }]
      })

      controller.verify()
    })

    it('should query project segments by site id if portal admin', () => {
      spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
        false
      )
      spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
        true
      )

      service.getSiteProjectsSegment(siteId).subscribe(({ data }) => {
        expect(data.sites[0].projects[0].segment).toEqual(
          mockSiteProjectsSegment[0].segment as Segment
        )
      })

      const op = controller.expectOne(SiteProjectsSegmentDocument)
      expect(op.operation.operationName).toEqual('siteProjectsSegment')

      op.flushData({
        sites: [{ projects: [...mockSiteProjectsSegment], __typename: 'Site' }]
      })

      controller.verify()
    })

    it('should query project segments by site id if customer user', () => {
      spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
        false
      )
      spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
        false
      )

      service.getUserSiteProjectsSegment(siteId).subscribe(({ data }) => {
        expect(data.me.relatedPortalData?.sites[0].projects[0].segment).toEqual(
          mockSiteProjectsSegment[0].segment as Segment
        )
      })

      const op = controller.expectOne(UserSiteProjectsSegmentDocument)
      expect(op.operation.operationName).toEqual('userSiteProjectsSegment')

      op.flushData({
        me: {
          relatedPortalData: {
            sites: [
              { projects: [...mockSiteProjectsSegment], __typename: 'Site' }
            ]
          }
        }
      })

      controller.verify()
    })
  })
})
