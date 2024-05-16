import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { IdentityUser, UserType } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoService } from '@ngneat/transloco'
import { of } from 'rxjs'
import { UserTableComponent } from './user-table.component'

const mockUser: IdentityUser = {
  customerEmail: null,
  email: 'admin_nljbakk@vanderlande.com',
  firstName: 'Jorn',
  id: 'f9b3abf4-f80c-471f-9da0-200b141856a4',
  lastName: 'Bakker',
  prefix: null,
  assignableRoles: [],
  roles: [],
  userType: UserType.Employee,
  username: ''
}

const expectedUserName = `${mockUser.firstName}${mockUser.prefix || ''}${
  mockUser.lastName
}`

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>
  let translocoService: TranslocoService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [getTranslocoModule()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(UserTableComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
    translocoService = TestBed.inject(TranslocoService)
  })

  it('should show no data texts if any', async () => {
    component.noDataText = '123'
    component.users = []

    fixture.detectChanges()
    await fixture.whenStable()

    const noDataTexts = fixture.debugElement.query(
      By.css('[data-testid="no-data-texts"]')
    )
    expect(noDataTexts.nativeElement.innerText).toContain('123')
  })

  it('should show no user texts if no data text does not exist', async () => {
    component.noDataText = ''
    component.users = []

    fixture.detectChanges()
    await fixture.whenStable()

    const noDataTexts = fixture.debugElement.query(
      By.css('[data-testid="no-data-texts"]')
    )
    expect(noDataTexts.nativeElement.innerText).toBe('There are no users.')
  })

  describe('on desktop', () => {
    beforeEach(() => {
      component.isTable$ = of(true)
      component.users = [{ ...mockUser }]
      fixture.detectChanges()
    })

    it('show correct headers', () => {
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="user-table-header"]')
      )
      expect(tableHeaders.length).toEqual(2)

      for (const [i, tableHeader] of tableHeaders.entries()) {
        expect(tableHeader.nativeElement.innerText).toBe(
          translocoService.translate(component.headers[i])
        )
      }
    })

    it('should show user name & customerEmail', async () => {
      const mockCustomerEmail = 'customerEmail@abc.com'
      component.users = [{ ...mockUser, customerEmail: mockCustomerEmail }]

      fixture.detectChanges()
      await fixture.whenStable()

      const userName = fixture.debugElement.query(
        By.css('[data-testid="user-table-name"]')
      )
      const userEmail = fixture.debugElement.query(
        By.css('[data-testid="user-table-email"]')
      )
      expect(userName.nativeElement.innerText.trim()).toContain(
        expectedUserName
      )
      expect(userEmail.nativeElement.innerText.trim()).toEqual(
        mockCustomerEmail
      )
    })

    it('should show email if customerEmail does not exist', () => {
      const userEmail = fixture.debugElement.query(
        By.css('[data-testid="user-table-email"]')
      )
      expect(userEmail.nativeElement.innerText.trim()).toEqual(mockUser.email)
    })

    it('should emit selected user id by clicking on table row', () => {
      spyOn(component.selectUser, 'emit')

      const tableRow = fixture.debugElement.query(
        By.css('[data-testid="user-table-row"]')
      )
      tableRow.triggerEventHandler('click', null)

      fixture.detectChanges()
      expect(component.selectUser.emit).toHaveBeenCalledWith(mockUser.id)
    })
  })

  describe('on Mobile', () => {
    beforeEach(() => {
      component.isTable$ = of(false)
      component.users = [{ ...mockUser }]
      fixture.detectChanges()
    })

    it('show user name and email in columns', () => {
      const tableRow = fixture.debugElement.query(
        By.css('[data-testid="user-table-row"]')
      )
      expect(tableRow).toBeFalsy()

      const cardList = fixture.debugElement.query(
        By.css('[data-testid="user-card-list"]')
      )
      expect(cardList).toBeTruthy()

      const userName = fixture.debugElement.query(
        By.css('[data-testid="card-name"]')
      )
      expect(userName.nativeElement.innerText.trim()).toContain(
        expectedUserName
      )
      const userEmail = fixture.debugElement.query(
        By.css('[data-testid="card-email"]')
      )
      expect(userEmail.nativeElement.innerText.trim()).toContain(mockUser.email)
    })

    it('should show email if customerEmail does not exist', () => {
      const userEmail = fixture.debugElement.query(
        By.css('[data-testid="card-email"]')
      )
      expect(userEmail.nativeElement.innerText.trim()).toEqual(mockUser.email)
    })

    it('should emit selected user id by clicking on table column', () => {
      spyOn(component.selectUser, 'emit')

      const cardList = fixture.debugElement.query(
        By.css('[data-testid="user-card-list"]')
      )
      cardList.triggerEventHandler('click', null)

      fixture.detectChanges()
      expect(component.selectUser.emit).toHaveBeenCalledWith(mockUser.id)
    })
  })
})
