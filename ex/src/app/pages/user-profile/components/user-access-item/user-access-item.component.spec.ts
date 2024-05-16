import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'

import { DatalistItem } from '@components/datalist/datalist-item.model'
import { Roles } from '@core/interfaces/roles.enum'
import { DatalistComponent } from '@components/datalist/datalist.component'
import { Portal, Site } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { AllocateUserToSiteGQL } from '@pages/user-profile/graphql/mutation/allocate-user-to-site.graphql-gen'
import { DeallocateUserFromPortalGQL } from '@pages/user-profile/graphql/mutation/deallocate-user-from-portal.graphql-gen'
import { DeallocateUserFromSiteGQL } from '@pages/user-profile/graphql/mutation/deallocate-user-from-site.graphql-gen'
import {
  UserAccessItemDocument,
  UserAccessItemGQL
} from '@pages/user-profile/graphql/query/user-access-item.graphql-gen'
import { UserProfileFragment } from '../../graphql/query/user-profile.graphql-gen'

import { UserAccessItemComponent } from './user-access-item.component'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { of } from 'rxjs'

describe('UserAccessItemComponent', () => {
  let controller: ApolloTestingController
  let component: UserAccessItemComponent
  let fixture: ComponentFixture<UserAccessItemComponent>
  let debugElement: DebugElement
  let query: UserAccessItemGQL
  let allocateMutation: AllocateUserToSiteGQL
  let deallocateMutation: DeallocateUserFromSiteGQL
  let deallocatePortalMutation: DeallocateUserFromPortalGQL

  const portalId = 'testPortalId'
  const portalName = 'portalName'

  const userFirstName = 'Test'
  const userLastName = 'Name'
  const userEmail = 'test@test.com'
  const userId = 'testUserId'

  const siteId = 'siteId'
  const siteName = 'site name'

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
      id: siteId,
      name: siteName
    } as Site,
    {
      id: 'anotherSiteId',
      name: 'anotherSiteName'
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
    portals: MockPortals.slice(0),
    sites: MockSites.slice(0),
    attributes: []
  } as UserProfileFragment

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAccessItemComponent, DatalistComponent],
      imports: [ApolloTestingModule, getTranslocoModule()],
      providers: [
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessItemComponent)
    component = fixture.componentInstance
    component.userId$ = of(MockUser.id)
    fixture.detectChanges()
    controller = TestBed.inject(ApolloTestingController)
    debugElement = fixture.debugElement
    query = TestBed.inject(UserAccessItemGQL)
    allocateMutation = TestBed.inject(AllocateUserToSiteGQL)
    deallocateMutation = TestBed.inject(DeallocateUserFromSiteGQL)
    deallocatePortalMutation = TestBed.inject(DeallocateUserFromPortalGQL)
  })

  beforeEach(async () => {
    component.user = { ...MockUser } as UserProfileFragment
    component.selectedPortalId = portalId
    component.userAccessItem = {
      selectedPortalName: portalName,
      selectedPortalId: portalId
    }
    fixture.detectChanges()
    await fixture.whenStable()
  })

  describe('on init', () => {
    xit('gets all sites of a selected portal', async () => {
      const mockSites = [
        {
          id: 'siteId',
          name: 'siteName',
          users: [
            {
              id: userId
            }
          ]
        } as Site
      ]
      spyOn(query, 'watch').and.callThrough()
      component.ngOnInit()
      const op = controller.expectOne(UserAccessItemDocument)
      expect(op.operation.operationName).toEqual('userAccess')
      expect(op.operation.variables.portalId).toEqual(portalId)
      expect(op.operation.variables.userId).toEqual(userId)
      expect(query.watch).toHaveBeenCalledWith({
        portalId: portalId
      })

      op.flush({
        data: {
          portals: [
            {
              name: portalName,
              users: [
                {
                  id: userId
                }
              ],
              sites: mockSites
            }
          ]
        }
      })
      controller.verify()
      setTimeout(() => {
        expect(component.sites).toEqual(mockSites)
      })
    })

    xit('sets if user has access to first portal on init', async () => {
      const mockSites = [
        {
          id: 'siteId',
          name: 'siteName',
          users: [
            {
              id: userId
            }
          ]
        } as Site
      ]
      spyOn(query, 'watch').and.callThrough()
      component.ngOnInit()
      const op = controller.expectOne(UserAccessItemDocument)
      expect(op.operation.operationName).toEqual('userAccess')
      expect(op.operation.variables.portalId).toEqual(portalId)
      expect(op.operation.variables.userId).toEqual(userId)
      expect(query.watch).toHaveBeenCalledWith({
        portalId: portalId
      })

      op.flush({
        data: {
          portals: [
            {
              name: portalName,
              users: [
                {
                  id: userId
                }
              ],
              sites: mockSites
            }
          ]
        }
      })
      controller.verify()
      setTimeout(() => {
        expect(component.hasAccessToSelectedPortal).toEqual(true)
      })
    })

    xit('sets if user doesnt have access to first portal on init', async () => {
      const mockSites = [
        {
          id: 'siteId',
          name: 'siteName',
          users: [
            {
              id: userId
            }
          ]
        } as Site
      ]
      spyOn(query, 'watch').and.callThrough()
      component.ngOnInit()
      const op = controller.expectOne(UserAccessItemDocument)
      expect(op.operation.operationName).toEqual('userAccess')
      expect(op.operation.variables.portalId).toEqual(portalId)
      expect(op.operation.variables.userId).toEqual(userId)
      expect(query.watch).toHaveBeenCalledWith({
        portalId: portalId
      })

      op.flush({
        data: {
          portals: [
            {
              name: portalName,
              users: [
                {
                  id: 'otherUserId'
                }
              ],
              sites: mockSites
            }
          ]
        }
      })
      controller.verify()
      setTimeout(() => {
        expect(component.hasAccessToSelectedPortal).toEqual(false)
      })
    })
  })

  it('renders checkboxes', async () => {
    component.sites = [
      {
        id: 'siteId',
        name: 'siteName',
        users: [
          {
            id: userId
          }
        ]
      } as Site,
      {
        id: 'siteId1',
        name: 'siteName1',
        users: [
          {
            id: userId
          }
        ]
      } as Site
    ]

    fixture.detectChanges()
    await fixture.whenStable()

    const siteCheckbox1 = debugElement.query(
      By.css('[data-testid="site-checkbox-00"]')
    )
    const siteCheckbox2 = debugElement.query(
      By.css('[data-testid="site-checkbox-10"]')
    )
    expect(siteCheckbox1).toBeTruthy()
    expect(siteCheckbox2).toBeTruthy()
  })

  it('renders data list and remove access button if user access item is defined', () => {
    const dataList = debugElement.query(By.css('[data-testid="datalist"]'))
    const removeAccessButton = debugElement.query(
      By.css('[data-testid="remove-access-button"]')
    )

    expect(dataList).toBeTruthy()
    expect(removeAccessButton).toBeTruthy()
  })

  it('sets selected portal on data list change', () => {
    const mockPortal = new DatalistItem('changedPortalId', 'Changed Portal')
    spyOn(component.selectPortalName, 'emit').and.callThrough()

    component.onDatalistChange(mockPortal)

    expect(component.selectPortalName.emit).toHaveBeenCalledOnceWith(mockPortal)
    expect(component.selectedPortalId).toEqual(mockPortal.value)
  })

  it('allocates user access', () => {
    const mockSite = {
      id: 'siteId',
      name: 'siteName',
      users: [
        {
          id: userId
        }
      ]
    } as Site
    spyOn(allocateMutation, 'mutate').and.callThrough()

    component.onCheckboxChange({ checked: true }, mockSite)

    expect(allocateMutation.mutate).toHaveBeenCalledOnceWith({
      siteId: mockSite.id,
      userId
    })
  })

  it('deallocates user access', () => {
    const mockSite = {
      id: 'siteId',
      name: 'siteName',
      users: [
        {
          id: userId
        }
      ]
    } as Site
    spyOn(deallocateMutation, 'mutate').and.callThrough()

    component.onCheckboxChange({ checked: false }, mockSite)

    expect(deallocateMutation.mutate).toHaveBeenCalledOnceWith({
      siteId: mockSite.id,
      userId
    })
  })

  it('removes user access from portal', () => {
    spyOn(deallocatePortalMutation, 'mutate').and.callThrough()

    component.removeUserAccess()

    expect(deallocatePortalMutation.mutate).toHaveBeenCalledOnceWith({
      portalId,
      userId
    })
  })

  it('does not remove user access from portal if no selected portal', () => {
    component.selectedPortalId = null
    component.index = 0
    spyOn(deallocateMutation, 'mutate').and.callThrough()
    spyOn(component.removeUserAccessItem, 'emit').and.callThrough()

    component.removeUserAccess()

    expect(deallocateMutation.mutate).not.toHaveBeenCalled()
    expect(component.removeUserAccessItem.emit).toHaveBeenCalledOnceWith(0)
  })
})
