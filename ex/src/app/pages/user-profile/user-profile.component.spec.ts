import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { IdentityUser } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoService } from '@ngneat/transloco'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { of } from 'rxjs'

import {
  UserProfileDocument,
  UserProfileGQL
} from './graphql/query/user-profile.graphql-gen'
import { UserProfileComponent } from './user-profile.component'

describe('UserProfileComponent', () => {
  let controller: ApolloTestingController
  let component: UserProfileComponent
  let fixture: ComponentFixture<UserProfileComponent>
  let query: UserProfileGQL
  let translocoService: TranslocoService

  const userFirstName = 'Test'
  const userLastName = 'Name'
  const userPrefix = 'de'
  const userEmail = 'test@test.com'
  const userId = 'testId'
  const portalId = 'testPortalId'

  const mockUser = {
    firstName: 'Test',
    lastName: 'user',
    prefix: 'de',
    language: 'nl-NL'
  } as IdentityUser

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ApolloTestingModule,
        UserProfileComponent,
        getTranslocoModule()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: userId
            })
          }
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
    fixture = TestBed.createComponent(UserProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    controller = TestBed.inject(ApolloTestingController)
    query = TestBed.inject(UserProfileGQL)
    translocoService = TestBed.inject(TranslocoService)

    window.history.pushState(
      {
        backLink: {
          title: translocoService.translate('General.Users'),
          url: `../portals/${portalId}/users`
        }
      },
      '',
      ''
    )
  })

  it('gets correct data on init', () => {
    spyOn(query, 'watch').and.callThrough()
    component.ngOnInit()

    const op = controller.expectOne(UserProfileDocument)
    expect(op.operation.operationName).toEqual('userProfile')
    expect(op.operation.variables.userId).toEqual(userId.toLowerCase())

    op.flush({
      data: {
        user: [
          {
            firstName: userFirstName,
            lastName: userLastName,
            prefix: userPrefix,
            email: userEmail,
            id: userId
          }
        ]
      }
    })

    controller.verify()

    expect(query.watch).toHaveBeenCalledWith(
      {
        userId: userId.toLowerCase()
      },
      { fetchPolicy: 'no-cache' }
    )
  })

  it('renders user name correctly', async () => {
    component.user = { ...mockUser }
    component.myProfile = false

    fixture.detectChanges()
    await fixture.whenStable()

    const userName = fixture.debugElement.query(
      By.css('[data-testid="user-name"]')
    )

    expect(userName.nativeElement.textContent.trim()).toContain(
      `${mockUser.firstName} ${mockUser.prefix} ${mockUser.lastName}`
    )
  })

  it('shows authorization tab if not my profile', async () => {
    component.user = { ...mockUser }
    component.myProfile = false

    fixture.detectChanges()
    await fixture.whenStable()

    const authorizationTab = fixture.debugElement.query(
      By.css('[data-testid="user-authorization-tab"]')
    )

    expect(authorizationTab).toBeTruthy()
  })

  it('does not show authorization tab if my profile', async () => {
    component.isSuperUser = false
    component.user = { ...mockUser }
    component.myProfile = true

    fixture.detectChanges()
    await fixture.whenStable()

    const authorizationTab = fixture.debugElement.query(
      By.css('[data-testid="user-authorization-tab"]')
    )

    expect(authorizationTab).toBeFalsy()
  })

  it('shows only authorization tab if my profile but user is super user', async () => {
    component.isSuperUser = true
    component.user = { ...mockUser }
    component.myProfile = true

    fixture.detectChanges()
    await fixture.whenStable()

    const authorizationTab = fixture.debugElement.query(
      By.css('[data-testid="user-authorization-tab"]')
    )
    expect(authorizationTab).toBeTruthy()
  })

  it('should show Users back button if user navigates from the general user list', async () => {
    const mockBackLink = {
      title: translocoService.translate('General.Users'),
      url: `../users`
    }

    window.history.pushState(
      {
        backLink: mockBackLink
      },
      ''
    )
    component.ngOnInit()

    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.backLink).toEqual(mockBackLink)

    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-link"]')
    )
    expect(backButton).toBeTruthy()
  })

  //note that the difference between this test and the one above is the url link
  it('should show Users back button if user navigates from a specific portal user list', async () => {
    const mockBackLink = {
      title: translocoService.translate('General.Users'),
      url: `../portals/${portalId}/users`
    }

    window.history.pushState(
      {
        backLink: mockBackLink
      },
      ''
    )
    component.ngOnInit()

    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.backLink).toEqual(mockBackLink)

    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-link"]')
    )
    expect(backButton).toBeTruthy()
  })

  it("should show Home back button if user navigates from my profile page via header's dropdown", async () => {
    window.history.pushState(
      {
        backLink: null
      },
      ''
    )
    component.ngOnInit()

    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.backLink).toEqual({
      title: translocoService.translate('General.Dashboard'),
      url: '/'
    })

    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-link"]')
    )
    expect(backButton).toBeTruthy()
  })
})
