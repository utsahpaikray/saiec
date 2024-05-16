import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import {
  ContactsBySiteIdDocument,
  ContactsBySiteIdGQL
} from '@core/sites/graphql/contacts-by-site-id.graphql-gen'
import { SiteContacts } from '@core/sites/sites.model'
import { MockSiteContacts } from '@core/sites/sites.service.mock'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { of } from 'rxjs'
import { ContactsComponent } from './contacts.component'
import { UserSiteContactGQL } from './graphql/user-site-contacts.graphql-gen'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { StoreModule } from '@ngrx/store'

function initializeSiteContactsData(
  controller: ApolloTestingController,
  query: ContactsBySiteIdGQL,
  mockContacts?: SiteContacts
) {
  const mock = mockContacts || {
    ...MockSiteContacts,
    itManagerContact: {
      ...MockSiteContacts.itManagerContact,
      show: false
    }
  }

  spyOn(query, 'fetch').and.callThrough()
  const op = controller.expectOne(ContactsBySiteIdDocument)
  expect(op.operation.operationName).toEqual('contactsBySiteId')

  op.flushData({
    sites: [mock]
  })
}

describe('ContactsComponent', () => {
  let component: ContactsComponent
  let fixture: ComponentFixture<ContactsComponent>
  let controller: ApolloTestingController
  let query: ContactsBySiteIdGQL
  let userQuery: UserSiteContactGQL
  let currentUserService: CurrentUserService
  const siteId = 'testSiteId'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [
        RouterTestingModule,
        getTranslocoModule(),
        ApolloTestingModule,
        StoreModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId
            })
          }
        },
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    controller = TestBed.inject(ApolloTestingController)
    currentUserService = TestBed.inject(CurrentUserService)
    query = TestBed.inject(ContactsBySiteIdGQL)
    userQuery = TestBed.inject(UserSiteContactGQL)
  })

  it('get correct data on init for super user', () => {
    spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
      true
    )
    spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
      false
    )
    initializeSiteContactsData(controller, query)
    controller.verify()
    spyOn(userQuery, 'fetch').and.callThrough()

    component.ngOnInit()

    expect(query.fetch).toHaveBeenCalledOnceWith({
      siteId
    })
    expect(userQuery.fetch).not.toHaveBeenCalled()
  })

  it('get correct data on init for portal admin', () => {
    spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
      false
    )
    spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
      true
    )
    initializeSiteContactsData(controller, query)
    controller.verify()
    spyOn(userQuery, 'fetch').and.callThrough()

    component.ngOnInit()

    expect(query.fetch).toHaveBeenCalledOnceWith({
      siteId
    })
    expect(userQuery.fetch).not.toHaveBeenCalled()
  })

  it('get correct data on init for customer user', () => {
    spyOnProperty(currentUserService, 'isSuperUser', 'get').and.returnValue(
      false
    )
    spyOnProperty(currentUserService, 'isPortalAdmin', 'get').and.returnValue(
      false
    )
    initializeSiteContactsData(controller, query)
    controller.verify()
    spyOn(userQuery, 'fetch').and.callThrough()

    component.ngOnInit()

    expect(query.fetch).not.toHaveBeenCalled()
    expect(userQuery.fetch).toHaveBeenCalledOnceWith(
      {
        siteId: 'testSiteId'
      },
      { fetchPolicy: 'no-cache' }
    )
  })

  it('set site contacts correctly', async () => {
    initializeSiteContactsData(controller, query)
    component.ngOnInit()
    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.contacts.length).toBe(5)

    // first contact is always contract manager
    expect(component.contacts[0].name).toBe(
      MockSiteContacts.contractManagerContact.name!
    )

    // contact is hidden when show is false
    expect(component.contacts[2].name).not.toBe(
      MockSiteContacts.itManagerContact.name!
    )

    // person
    expect(component.contacts[1].alternativeContactTitle).toBe(
      MockSiteContacts.accountManagerContact.alternativeContactTitle!
    )
    expect(component.contacts[1].emailAddress).toBe(
      MockSiteContacts.accountManagerContact.emailAddress!
    )
    expect(component.contacts[1].iconName).toBe('')
    expect(component.contacts[1].name).toBe(
      MockSiteContacts.accountManagerContact.name!
    )
    expect(component.contacts[1].phoneNumber).toBe(
      MockSiteContacts.accountManagerContact.phoneNumber!
    )
    expect(component.contacts[1].title).toBe('Contacts.AccountManagerContact')

    // set correct icon name
    expect(component.contacts[2].iconName).toBe('users')
    expect(component.contacts[3].iconName).toBe('mail')
    expect(component.contacts[4].iconName).toBe('portal')

    // service desk phone number outside working hours
    expect(component.contacts[2].phoneNumberOutsideWorkingHours).toBe(
      MockSiteContacts.serviceDeskContact.phoneNumberOutsideWorkingHours!
    )

    // organization
    expect(component.contacts[4].address).toBe(
      MockSiteContacts.visitingOfficeContact.address!
    )
  })

  it('should show contacts group', () => {
    component.contacts = [
      {
        id: 'account-manager-contact',
        title: 'Account Manager',
        __typename: 'AccountManagerContact'
      }
    ]
    fixture.detectChanges()

    const contactCard = fixture.debugElement.query(By.css('app-contacts-group'))
    expect(contactCard).toBeTruthy()
  })

  it('should not add empty contact', fakeAsync(() => {
    initializeSiteContactsData(controller, query, {
      ...MockSiteContacts,
      accountManagerContact: {
        show: true
      }
    })
    tick()
    component.ngOnInit()
    fixture.detectChanges()
    tick()

    const accountManagerContact = component.contacts.find(
      (contact) =>
        contact.__typename === MockSiteContacts.accountManagerContact.__typename
    )
    expect(accountManagerContact).toBeFalsy()
  }))
})
