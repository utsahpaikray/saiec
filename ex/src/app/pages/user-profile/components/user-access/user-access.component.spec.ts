import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'

import { Roles } from '@core/interfaces/roles.enum'
import { Portal, RelatedPortalData, Site } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import {
  UserProfileDocument,
  UserProfileFragment,
  UserProfileGQL
} from '../../graphql/query/user-profile.graphql-gen'

import { PortalServiceMock } from '@core/portals/portal.serivce.mock'
import { PortalService } from '@core/portals/portal.service'
import { UserAccessComponent } from './user-access.component'
import { UserAccessItemComponent } from '../user-access-item/user-access-item.component'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'

describe('UserAccessComponent', () => {
  let controller: ApolloTestingController
  let component: UserAccessComponent
  let fixture: ComponentFixture<UserAccessComponent>
  let debugElement: DebugElement
  let portalService: PortalService
  let query: UserProfileGQL

  const userFirstName = 'Test'
  const userLastName = 'Name'
  const userEmail = 'test@test.com'
  const userId = 'testId'

  const portalId = 'portalId'
  const portalName = 'portal name'

  const siteId = 'siteId'

  const MockPortals: Portal[] = [
    {
      id: portalId,
      name: portalName
    } as Portal,
    {
      id: 'anotherPortalId',
      name: 'anotherPortalName'
    } as Portal
  ]
  const MockSites: Site[] = [
    {
      id: siteId
    } as Site,
    {
      id: 'anotherSiteId'
    } as Site
  ]

  const MockUser = {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    id: userId,
    roles: [
      {
        id: 'superUser',
        name: Roles.SuperUser
      }
    ],
    relatedPortalData: {
      portals: MockPortals.slice(0),
      sites: MockSites.slice(0)
    } as RelatedPortalData
  } as UserProfileFragment

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        getTranslocoModule(),
        ApolloTestingModule
      ],
      declarations: [UserAccessComponent, UserAccessItemComponent],
      providers: [
        {
          provide: PortalService,
          useClass: PortalServiceMock
        },
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessComponent)
    component = fixture.componentInstance
    component.userId$ = of(MockUser.id)
    fixture.detectChanges()

    debugElement = fixture.debugElement
    controller = TestBed.inject(ApolloTestingController)
    query = TestBed.inject(UserProfileGQL)
    portalService = TestBed.inject(PortalService)
    component.user = { ...MockUser } as UserProfileFragment
  })

  it('gets correct data and show allocated portal name on init', fakeAsync(() => {
    spyOn(query, 'watch').and.callThrough()
    spyOn(portalService, 'getPortals').and.returnValue(of(MockPortals.slice(0)))
    component.ngOnInit()

    const op = controller.expectOne(UserProfileDocument)
    expect(op.operation.operationName).toEqual('userProfile')
    expect(op.operation.variables.userId).toEqual(userId)

    op.flush({
      data: {
        user: [
          {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            id: userId
          }
        ]
      }
    })

    controller.verify()

    expect(query.watch).toHaveBeenCalledWith(
      {
        userId: userId
      },
      { fetchPolicy: 'no-cache' }
    )
    tick()
    expect(portalService.getPortals).toHaveBeenCalled()
  }))

  it('add new user access item by clicking on add portal button', async () => {
    component.user = {
      ...component.user,
      relatedPortalData: {
        ...component.user.relatedPortalData,
        portals: [MockPortals[0]]
      } as RelatedPortalData
    }
    component.canAddPortalAccess = true
    component.initializeUserAccessItems(MockPortals.slice(0))

    fixture.detectChanges()
    await fixture.whenStable()

    const addPortalButton = debugElement.query(
      By.css('[data-testid="add-portal-button"]')
    )

    addPortalButton.nativeElement.click()
    fixture.detectChanges()
    await fixture.whenStable()

    const secondUserAccessItem = debugElement.query(
      By.css('[data-testid="user-access-1"]')
    )
    expect(secondUserAccessItem).toBeTruthy()
  })
})
