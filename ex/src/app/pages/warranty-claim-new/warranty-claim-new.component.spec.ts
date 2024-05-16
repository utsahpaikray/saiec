import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { MaximoSiteContact } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'
import { WarrantyClaimNewComponent } from './warranty-claim-new.component'

interface WarrantyNew {
  customerSiteContactId: string
  ticketReference: string
  summary: string
  warrantyItems: []
}

const siteId = 'testSiteId'

const mockSiteContacts = [
  {
    email: 'enes.test@vanderlande.com',
    id: 'EX.02386',
    name: 'Enes Erden (External)',
    phone: '+3106123456799',
    __typename: 'MaximoSiteContact'
  },
  {
    email: '',
    id: 'EX.02388',
    name: 'Alper Termen (External)',
    phone: '',
    __typename: 'MaximoSiteContact'
  }
] as MaximoSiteContact[]

const formInitialValues = {
  customerSiteContactId: '',
  ticketReference: '',
  summary: '',
  warrantyItems: [null]
}

const mockForm = (component: WarrantyClaimNewComponent) => {
  component.customerSiteContactId.setValue(
    expectedFormValues.customerSiteContactId
  )
  component.form.controls['ticketReference'].setValue(
    expectedFormValues.ticketReference
  )
  component.summary.setValue(expectedFormValues.summary)
}

const expectedFormValues = {
  customerSiteContactId: 'EX.02395',
  ticketReference: 'test ticket reference',
  summary: 'test summary',
  warrantyItems: [null]
}

describe('WarrantyClaimNewComponent', () => {
  let component: WarrantyClaimNewComponent
  let fixture: ComponentFixture<WarrantyClaimNewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WarrantyClaimNewComponent,
        getTranslocoModule(),
        ReactiveFormsModule,
        ApolloTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId
            })
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(WarrantyClaimNewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('shows page title and back button', () => {
    const title = fixture.debugElement.query(
      By.css('[data-testid="new-warranty-title"]')
    )
    expect(title).toBeTruthy()

    const backButton = fixture.debugElement.query(
      By.css('[data-testid="back-button"]')
    )
    expect(backButton).toBeTruthy()
    expect(
      backButton.nativeElement.getAttribute('ng-reflect-router-link')
    ).toBe('../')
  })

  describe('selected site contact info', () => {
    it('show contact email and phone when customer site contact is selected', () => {
      component.siteTicketContacts$ = of(mockSiteContacts)
      component.selectedSiteContact$ = of(mockSiteContacts[0])
      fixture.detectChanges()

      const selectedSiteContactInfo = fixture.debugElement.query(
        By.css('[data-testid="warranty-selected-site-contact"]')
      )
      const selectedSiteContactEmail = fixture.debugElement.query(
        By.css('[data-testid="warranty-selected-site-contact-email"]')
      )
      const selectedSiteContactPhone = fixture.debugElement.query(
        By.css('[data-testid="warranty-selected-site-contact-phone"]')
      )
      expect(selectedSiteContactInfo).toBeTruthy()
      expect(selectedSiteContactEmail.nativeElement.innerText.trim()).toBe(
        mockSiteContacts[0].email
      )
      expect(selectedSiteContactPhone.nativeElement.innerText.trim()).toBe(
        mockSiteContacts[0].phone
      )
    })

    it('show contact email and phone when customer site contact is selected but with no data', () => {
      component.siteTicketContacts$ = of(mockSiteContacts)
      component.selectedSiteContact$ = of(mockSiteContacts[1])
      fixture.detectChanges()

      const selectedSiteContactInfo = fixture.debugElement.query(
        By.css('[data-testid="warranty-selected-site-contact"]')
      )
      const selectedSiteContactEmail = fixture.debugElement.query(
        By.css('[data-testid="warranty-selected-site-contact-email"]')
      )
      const selectedSiteContactPhone = fixture.debugElement.query(
        By.css('[data-testid="warranty-selected-site-contact-phone"]')
      )
      expect(selectedSiteContactInfo).toBeTruthy()
      expect(selectedSiteContactEmail.nativeElement.innerText.trim()).toBe('-')
      expect(selectedSiteContactPhone.nativeElement.innerText.trim()).toBe('-')
    })

    it('do not show contact email and phone when customer site contact is not selected', () => {
      const selectedSiteContactInfo = fixture.debugElement.query(
        By.css('[data-testid="selected-site-contact"]')
      )
      expect(selectedSiteContactInfo).toBeFalsy()
    })
  })

  describe('form logic', () => {
    it('check initial values for create warranty form', () => {
      expect(component.form.getRawValue()).toEqual(
        formInitialValues as WarrantyNew
      )
    })

    it('sets correct form values', () => {
      mockForm(component)
      fixture.detectChanges()
      expect(component.form.value).toEqual(expectedFormValues as WarrantyNew)
    })
  })

  describe('form validations on submit', () => {
    it('form is invalid when it is blank', () => {
      expect(component.form.valid).toBeFalsy()
    })

    it('required errors are shown', () => {
      component.siteTicketContacts$ = of(mockSiteContacts)
      expect(component.form.updateOn).toEqual('submit')

      component.form.markAllAsTouched()
      component.onSubmit()
      fixture.detectChanges()

      const customerSiteContactRequiredError = fixture.debugElement.query(
        By.css('[data-testid="customer-site-contact-required-error"]')
      )
      const summaryRequiredError = fixture.debugElement.query(
        By.css('[data-testid="summary-required-error"]')
      )
      expect(component.form.valid).toBeFalsy()
      expect(customerSiteContactRequiredError).toBeTruthy()
      expect(summaryRequiredError).toBeTruthy()
    })
  })

  describe('warranty item', () => {
    it('warranty item exists', () => {
      const warrantyItem = fixture.debugElement.query(
        By.css('[data-testid="warranty-item"]')
      )
      expect(warrantyItem).toBeTruthy()
    })

    it('add and remove warranty item', () => {
      component.addWarrantyItem()
      component.addWarrantyItem()

      fixture.detectChanges()
      expect(component.warrantyItems.controls.length).toBe(3)

      component.removeWarrantyItem(1)
      expect(component.warrantyItems.controls.length).toBe(2)
    })

    it('disable add warranty item when any warranty items are in edit status', () => {
      spyOnProperty(component.warrantyItems, 'valid').and.returnValue(true)

      component.warrantyItemsEditStatus = [false]
      component.updateWarrantyItemsEditStatus({ index: 0, isEdit: true })
      fixture.detectChanges()

      const addWarrantyItemButton = fixture.debugElement.query(
        By.css('[data-testid="add-warranty-item"]')
      )
      expect(addWarrantyItemButton.nativeElement.disabled).toBe(true)
    })
  })
})
