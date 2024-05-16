import { NO_ERRORS_SCHEMA } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { of } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'

import { UserOverviewComponent } from './user-overview.component'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { Roles } from '@core/interfaces/roles.enum'
import { Portal } from '@core/generated/types'
import { PortalService } from '@core/portals/portal.service'
import { PortalServiceMock } from '@core/portals/portal.serivce.mock'
import { CurrentUserFragment } from '@core/current-user/graphql/current-user.graphql-gen'
import {
  PortalUserFragment,
  PortalUsersDocument,
  PortalUsersGQL
} from './graphql/portal-users.graphql-gen'
import { TranslocoService } from '@ngneat/transloco'

const MockPortalUsers = {
  edges: [
    {
      cursor: 'MA==',
      node: {
        relatedIdentityData: {
          email: 'test@test.com',
          firstName: 'firstname',
          id: 'testId',
          lastName: 'lastname'
        }
      }
    },
    {
      cursor: 'MQ==',
      node: {
        relatedIdentityData: null
      }
    }
  ],
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false
  },
  totalCount: 2
} as PortalUserFragment

describe('UserOverviewComponent', () => {
  let component: UserOverviewComponent
  let fixture: ComponentFixture<UserOverviewComponent>
  let activatedRoute: ActivatedRoute
  let router: Router
  let currentUserService: CurrentUserService
  let controller: ApolloTestingController
  let query: PortalUsersGQL
  let translocoService: TranslocoService
  let mockBackLink: { title: string; url: string }

  const portalId = 'portalId'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOverviewComponent],
      imports: [ApolloTestingModule, RouterTestingModule, getTranslocoModule()],
      providers: [
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        },
        {
          provide: PortalService,
          useClass: PortalServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              portalId: portalId
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    currentUserService = TestBed.inject(CurrentUserService)
    activatedRoute = TestBed.inject(ActivatedRoute)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    router = TestBed.inject(Router)
    controller = TestBed.inject(ApolloTestingController)
    query = TestBed.inject(PortalUsersGQL)
    translocoService = TestBed.inject(TranslocoService)

    mockBackLink = {
      title: translocoService.translate('General.Users'),
      url: `..${router.routerState.snapshot.url}`
    }
  })

  it('gets correct data on init and excludes deleted keyclock users', fakeAsync(() => {
    spyOn(query, 'fetch').and.callThrough()

    const op = controller.expectOne(PortalUsersDocument)
    expect(op.operation.operationName).toEqual('portalUsers')

    op.flush({
      data: {
        portal_users: MockPortalUsers
      }
    })

    controller.verify()

    component.ngOnInit()
    expect(query.fetch).toHaveBeenCalled()

    tick()

    expect(component.users.length).toEqual(1)
  }))

  it('should not show back button if portal id is undefined', async () => {
    component.portal = undefined
    fixture.detectChanges()

    await fixture.whenStable()
    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-button"]')
    )
    expect(backButton).toBeFalsy()
  })

  it('should show back button if portal is defined', async () => {
    component.portal = { id: 'testPortalId', name: 'Test Portal' } as Portal

    fixture.detectChanges()
    await fixture.whenStable()
    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-button"]')
    )
    expect(backButton).toBeTruthy()
  })

  it('should go to user profile page', () => {
    mockBackLink.url = '../'

    currentUserService.userData$ = of({
      roles: [Roles.SuperUser],
      id: 'userId',
      me: {} as CurrentUserFragment
    })
    spyOn(router, 'navigate')

    component.goToUserProfilePage('user123')

    expect(router.navigate).toHaveBeenCalledWith(['./user123'], {
      state: {
        backLink: mockBackLink
      },
      relativeTo: activatedRoute
    })
  })

  it('should go to my profile page if clicking myself from related router state snapshot url', () => {
    currentUserService.userData$ = of({
      roles: [Roles.SuperUser],
      id: 'userId',
      me: {} as CurrentUserFragment
    })

    spyOn(router, 'navigate')
    component.goToUserProfilePage('userId')

    expect(router.navigate).toHaveBeenCalledWith(['/myprofile'], {
      state: {
        backLink: mockBackLink
      },
      relativeTo: undefined
    })
  })
})
