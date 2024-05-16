import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { UserAuthorizationComponent } from './user-authorization.component'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import {
  UserAuthorizationDocument,
  UserAuthorizationGQL
} from '../../graphql/query/user-authorization.graphql-gen'
import { IdentityUser, Role } from '@core/generated/types'
import { of } from 'rxjs'
import { NetworkStatus } from '@apollo/client/core'
import { By } from '@angular/platform-browser'
import {
  AddRoleToUserDocument,
  AddRoleToUserGQL
} from '../../graphql/mutation/add-role-to-user.graphql-gen'
import {
  RemoveRoleFromUserDocument,
  RemoveRoleFromUserGQL
} from '../../graphql/mutation/remove-role-from-user.graphql-gen'
import { RoleDisplayContentPipe } from '@core/pipes/role-display-content.pipe'

describe('UserAuthorizationComponent', () => {
  let component: UserAuthorizationComponent
  let fixture: ComponentFixture<UserAuthorizationComponent>
  let controller: ApolloTestingController
  let userAuthorizationQuery: UserAuthorizationGQL
  let removeRoleFromUserQuery: RemoveRoleFromUserGQL
  let addRoleToUserQuery: AddRoleToUserGQL

  const mockSuperUser = {
    id: 'testSuperUserId',
    firstName: 'Super',
    lastName: 'user',
    prefix: null,
    language: 'nl-NL',
    roles: [
      {
        id: 'testSuperUserRoleId',
        name: 'SuperUser',
        __typename: 'Role'
      }
    ]
  } as IdentityUser

  const mockSuperUserRoleData = {
    assignableRoles: [
      {
        id: 'testPortalAdminId',
        name: 'PortalAdmin',
        __typename: 'Role'
      },
      {
        id: 'testVanderlandeUserId',
        name: 'VanderlandeUser',
        __typename: 'Role'
      }
    ],
    id: mockSuperUser.id,
    roles: [...mockSuperUser.roles],
    __typename: 'IdentityUser'
  } as IdentityUser

  const mockCustomer = {
    id: 'testCustomerId',
    firstName: 'Customer',
    lastName: 'user',
    prefix: null,
    language: 'nl-NL',
    roles: [
      {
        id: 'testCustomerRoleId',
        name: 'User',
        __typename: 'Role'
      }
    ]
  } as IdentityUser

  const mockCustomerRoleData = {
    assignableRoles: [
      {
        id: 'testCustomerId',
        name: 'User',
        __typename: 'Role'
      }
    ],
    id: mockCustomer.id,
    roles: [] as Role[],
    __typename: 'IdentityUser'
  } as IdentityUser

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        RouterTestingModule.withRoutes([]),
        getTranslocoModule(),
        RoleDisplayContentPipe
      ],
      providers: [
        { provide: CurrentUserService, useClass: CurrentUserServiceMock },
        RoleDisplayContentPipe
      ],
      declarations: [UserAuthorizationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorizationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    controller = TestBed.inject(ApolloTestingController)
    userAuthorizationQuery = TestBed.inject(UserAuthorizationGQL)
    removeRoleFromUserQuery = TestBed.inject(RemoveRoleFromUserGQL)
    addRoleToUserQuery = TestBed.inject(AddRoleToUserGQL)
  })

  it('gets correct data on changes', () => {
    spyOn(userAuthorizationQuery, 'fetch').and.callThrough()
    component.user = { ...mockSuperUser }
    component.ngOnChanges()

    fixture.detectChanges()

    const op = controller.expectOne(UserAuthorizationDocument)
    expect(op.operation.operationName).toEqual('userAuthorization')
    expect(op.operation.variables.userId).toEqual(mockSuperUser.id)

    op.flush({
      data: {
        user: mockSuperUserRoleData
      }
    })

    controller.verify()

    expect(userAuthorizationQuery.fetch).toHaveBeenCalledWith({
      userId: mockSuperUser.id
    })
  })

  it('display employee user type roles correctly', async () => {
    spyOn(userAuthorizationQuery, 'fetch').and.returnValue(
      of({
        loading: false,
        networkStatus: NetworkStatus.ready,
        data: {
          user: mockSuperUserRoleData
        }
      })
    )

    component.user = { ...mockSuperUser }
    component.ngOnChanges()
    fixture.detectChanges()
    await fixture.whenStable()

    // selected role is correct
    expect(component.selectedRole).toBe(mockSuperUser.roles[0])

    // sort by custom order
    expect(component.roles[0]).toEqual(mockSuperUserRoleData.assignableRoles[1])
    expect(component.roles[1]).toEqual(mockSuperUserRoleData.assignableRoles[0])
    expect(component.roles[2]).toEqual(mockSuperUserRoleData.roles[0])

    // radio buttons shown correctly
    const portalAdminRadioButton = fixture.debugElement.query(
      By.css('[data-testid="PortalAdmin"]')
    )
    const superUserRadioButton = fixture.debugElement.query(
      By.css('[data-testid="SuperUser"]')
    )
    const vanderlandeUserRadioButton = fixture.debugElement.query(
      By.css('[data-testid="VanderlandeUser"]')
    )
    const customerRoleDisplayContent = fixture.debugElement.query(
      By.css('[data-testid="single-role-block"]')
    )
    expect(portalAdminRadioButton).toBeTruthy()
    expect(superUserRadioButton).toBeTruthy()
    expect(vanderlandeUserRadioButton).toBeTruthy()
    expect(customerRoleDisplayContent).toBeFalsy()
  })

  it('display customer user type roles correctly', async () => {
    spyOn(userAuthorizationQuery, 'fetch').and.returnValue(
      of({
        loading: false,
        networkStatus: NetworkStatus.ready,
        data: {
          user: mockCustomerRoleData
        }
      })
    )

    component.user = { ...mockCustomer }
    component.ngOnChanges()
    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.roles[0]).toEqual(mockCustomerRoleData.assignableRoles[0])
    expect(component.selectedRole).toBeUndefined()

    // radio buttons should not be shown
    const portalAdminRadioButton = fixture.debugElement.query(
      By.css('[data-testid="PortalAdmin"]')
    )
    const superUserRadioButton = fixture.debugElement.query(
      By.css('[data-testid="SuperUser"]')
    )
    const vanderlandeUserRadioButton = fixture.debugElement.query(
      By.css('[data-testid="VanderlandeUser"]')
    )
    expect(portalAdminRadioButton).toBeFalsy()
    expect(superUserRadioButton).toBeFalsy()
    expect(vanderlandeUserRadioButton).toBeFalsy()

    const customerRoleDisplayContent = fixture.debugElement.query(
      By.css('[data-testid="single-role-block"]')
    )
    expect(customerRoleDisplayContent).toBeTruthy()
    expect(customerRoleDisplayContent.children[0].nativeElement.innerText).toBe(
      'Customer User'
    )
  })

  it('change super user role to portal admin role', fakeAsync(() => {
    spyOn(userAuthorizationQuery, 'fetch').and.returnValue(
      of({
        loading: false,
        networkStatus: NetworkStatus.ready,
        data: {
          user: mockSuperUserRoleData
        }
      })
    )

    component.user = { ...mockSuperUser }
    component.ngOnChanges()
    tick()

    expect(userAuthorizationQuery.fetch).toHaveBeenCalledWith({
      userId: mockSuperUser.id
    })
    expect(component.selectedRole).toBe(mockSuperUser.roles[0])

    // remove current role
    spyOn(removeRoleFromUserQuery, 'mutate').and.callThrough()
    spyOn(addRoleToUserQuery, 'mutate').and.callThrough()
    const mockSelectedRole = {
      id: 'testPortalAdminRoleId',
      name: 'PortalAdmin'
    }
    const removeRoleVariables = {
      userId: component.identityUser.id,
      roleId: component.currentRole.id
    }
    component.onRoleChange(mockSelectedRole)
    component.selectedRole = mockSelectedRole
    tick()

    const removeRoleOp = controller.expectOne(RemoveRoleFromUserDocument)
    expect(removeRoleOp.operation.operationName).toEqual('removeRoleFromUser')
    expect(removeRoleOp.operation.variables).toEqual(removeRoleVariables)
    removeRoleOp.flush({
      data: {
        removeRoleFromUser: true
      }
    })
    flush()

    const addRoleVariables = {
      userId: component.identityUser.id,
      roleId: component.selectedRole.id
    }
    const addRoleOp = controller.expectOne(AddRoleToUserDocument)
    expect(addRoleOp.operation.operationName).toEqual('addRoleToUser')
    expect(addRoleOp.operation.variables).toEqual(addRoleVariables)

    addRoleOp.flush({
      data: {
        addRoleToUser: true
      }
    })

    const op = controller.expectOne(UserAuthorizationDocument)
    expect(op.operation.operationName).toEqual('userAuthorization')
    expect(op.operation.variables.userId).toEqual(mockSuperUser.id)

    op.flush({
      data: {
        user: mockSuperUserRoleData
      }
    })
    controller.verify()
    flush()

    expect(removeRoleFromUserQuery.mutate).toHaveBeenCalled()
    expect(addRoleToUserQuery.mutate).toHaveBeenCalledWith(addRoleVariables, {
      refetchQueries: [
        {
          query: UserAuthorizationDocument,
          variables: { userId: mockSuperUserRoleData.id }
        }
      ]
    })
    expect(component.selectedRole).toBe(mockSelectedRole)
  }))

  it('disabled authorization radio buttons if my profile is true', async () => {
    spyOn(userAuthorizationQuery, 'fetch').and.returnValue(
      of({
        loading: false,
        networkStatus: NetworkStatus.ready,
        data: {
          user: mockSuperUserRoleData
        }
      })
    )

    component.user = { ...mockSuperUser }
    component.myProfile = true
    component.ngOnChanges()
    fixture.detectChanges()
    await fixture.whenStable()

    // radio buttons should be disabled
    const portalAdminRadioButton = fixture.debugElement.query(
      By.css('[data-testid="PortalAdmin"]')
    )
    const superUserRadioButton = fixture.debugElement.query(
      By.css('[data-testid="SuperUser"]')
    )
    const vanderlandeUserRadioButton = fixture.debugElement.query(
      By.css('[data-testid="VanderlandeUser"]')
    )
    expect(portalAdminRadioButton.nativeElement.disabled).toBe(true)
    expect(superUserRadioButton.nativeElement.disabled).toBe(true)
    expect(vanderlandeUserRadioButton.nativeElement.disabled).toBe(true)
  })
})
