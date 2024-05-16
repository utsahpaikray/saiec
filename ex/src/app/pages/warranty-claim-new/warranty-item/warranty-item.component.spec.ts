import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Asset, DocumentInput } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoService } from '@ngneat/transloco'
import { of } from 'rxjs'
import { WarrantyItem } from '../warranty-create-form.interface'
import { WarrantyItemComponent } from './warranty-item.component'

const mockSelectedAsset = {
  customerNumber: '',
  description: 'Twin Belt',
  markCode: 'TB',
  markNumber: '1401.39.001.000',
  siteId: '2315962',
  systemComponentId: 'A_SYS29415259',
  __typename: 'Asset'
} as Asset

const mockSelectedItem = {
  classificationLevel1: 'Electrical component',
  classificationLevel2: 'Field component',
  classificationLevel3: 'Cable prefab',
  classificationLevel4: '',
  classificationLevel5: '',
  description: 'Standard Earth Litz 10mm² / M6 - M6 / 0,5mtr',
  itemNumber: '0G0027-130-10500',
  sparePartCategory: null,
  systemComponentId: 'A_SYS32685843',
  __typename: 'Asset'
} as Asset

const mockDocument: DocumentInput = {
  documentName: 'doc 1',
  description: 'pdf doc',
  documentData:
    'n7D28U5G0tNr19HFkmKRoB+9TBne3+rRC9qRYaDx7VMB7K5vxamWDjDaAz7NXoJ9w5PENk0ylcZHZhrse+'
}

const expectedFormValues = {
  item: mockSelectedItem,
  asset: mockSelectedAsset,
  itemQuantity: '2.2',
  serialNumber: 'test serial number',
  warrantyReason: 'test reason',
  breakdownDate: '2024-08-07',
  attachments: [{ ...mockDocument }]
} as WarrantyItem

const siteId = 'testSiteId'

const mockForm = (component: WarrantyItemComponent) => {
  for (const [key, value] of Object.entries(expectedFormValues)) {
    if (key === 'attachments') {
      component.addAttachmentToWarranty({ ...mockDocument })
    } else {
      component.form.get(key)?.setValue(value)
    }
  }
}

describe('WarrantyItemComponent', () => {
  let component: WarrantyItemComponent
  let fixture: ComponentFixture<WarrantyItemComponent>
  const formBuilder: FormBuilder = new FormBuilder()
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        WarrantyItemComponent,
        ReactiveFormsModule,
        HttpClientModule,
        getTranslocoModule()
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
        { provide: FormBuilder, useValue: formBuilder }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    fixture = TestBed.createComponent(WarrantyItemComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
    translocoService = TestBed.inject(TranslocoService)
  })

  describe('warranty item', () => {
    it('shows first warranty item as expanded collapsible with correct elements', () => {
      const collapsible = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-collapsible"]')
      )
      expect(collapsible).toBeTruthy()
      expect(collapsible.nativeElement.attributes['expanded']).toBeTruthy()

      const warrantyPartTitle = fixture.debugElement.query(
        By.css('[data-testid="warranty-part-title"]')
      )
      expect(warrantyPartTitle.nativeElement.textContent.trim()).toBe(
        `${translocoService.translate('WarrantyClaims.WarrantyParts')} 1`
      )

      const warrantyItemForm = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-form"]')
      )
      const warrantyItemTable = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-table"]')
      )
      expect(warrantyItemForm).toBeTruthy()
      expect(warrantyItemTable).toBeFalsy()
    })

    it('does not show cancel and remove buttons for the first warranty item', () => {
      component.index = 0
      fixture.detectChanges()

      const removeItemButton = fixture.debugElement.query(
        By.css('[data-testid="remove-item-button"]')
      )
      const cancelItemButton = fixture.debugElement.query(
        By.css('[data-testid="edit-item-button"]')
      )
      expect(removeItemButton).toBeFalsy()
      expect(cancelItemButton).toBeFalsy()
    })

    it('show cancel button for second warranty item, removes item when clicks on it', async () => {
      component.index = 1
      fixture.detectChanges()

      const removeItemSpy = spyOn(
        component,
        'removeWarrantyItem'
      ).and.callThrough()

      const firstCancelItemButton = fixture.debugElement.queryAll(
        By.css('[data-testid="cancel-item-button"]')
      )[0]
      firstCancelItemButton.triggerEventHandler('click', null)
      fixture.detectChanges()
      await fixture.whenStable()

      expect(removeItemSpy).toHaveBeenCalledWith(1)
    })

    describe('edit', () => {
      it('show edit button if form is valid', () => {
        mockForm(component)
        component.form.markAllAsTouched()
        fixture.detectChanges()

        const editItemButton = fixture.debugElement.query(
          By.css('[data-testid="edit-item-button"]')
        )
        expect(editItemButton).toBeTruthy()
      })

      it('disable edit button if any warranty items are on edit mode', () => {
        mockForm(component)
        component.form.markAllAsTouched()
        component.isAnyWarrantyItemsOnEdit = true
        fixture.detectChanges()

        const editItemButton = fixture.debugElement.query(
          By.css('[data-testid="edit-item-button"]')
        )
        expect(editItemButton).toBeTruthy()
        expect(editItemButton.nativeElement.disabled).toBe(true)
      })

      it('edit item', async () => {
        mockForm(component)
        component.form.markAllAsTouched()
        fixture.detectChanges()
        await fixture.whenStable()

        const editItemButton = fixture.debugElement.query(
          By.css('[data-testid="edit-item-button"]')
        )
        editItemButton.nativeElement.click()
        fixture.detectChanges()
        await fixture.whenStable()

        const warrantyItemForm = fixture.debugElement.query(
          By.css('[data-testid="warranty-item-form"]')
        )
        const warrantyItemTable = fixture.debugElement.query(
          By.css('[data-testid="warranty-item-table"]')
        )
        expect(warrantyItemForm).toBeTruthy()
        expect(warrantyItemTable).toBeFalsy()
      })
    })

    describe('remove', () => {
      it('show remove button if form is valid and not the first warranty item', () => {
        mockForm(component)
        component.index = 1
        component.form.markAllAsTouched()
        fixture.detectChanges()

        const editItemButton = fixture.debugElement.query(
          By.css('[data-testid="edit-item-button"]')
        )
        const removeItemButton = fixture.debugElement.query(
          By.css('[data-testid="remove-item-button"]')
        )
        expect(editItemButton).toBeTruthy()
        expect(removeItemButton).toBeTruthy()
      })

      it('remove item when clicks on remove item button', async () => {
        mockForm(component)
        component.index = 1
        component.form.markAllAsTouched()
        fixture.detectChanges()
        await fixture.whenStable()

        const removeItemSpy = spyOn(
          component,
          'removeWarrantyItem'
        ).and.callThrough()

        const removeItemButton = fixture.debugElement.query(
          By.css('[data-testid="remove-item-button"]')
        )
        removeItemButton.triggerEventHandler('click', null)
        fixture.detectChanges()
        await fixture.whenStable()

        expect(removeItemSpy).toHaveBeenCalledWith(1)
      })
    })
  })

  describe('form group', () => {
    it('checks initial form values for warranty items form group', () => {
      const warrantyItemsFormInitialValues = {
        asset: null,
        item: null,
        itemQuantity: '1',
        serialNumber: '',
        warrantyReason: '',
        warrantyInfo: 'Active',
        breakdownDate: '',
        attachments: []
      }
      expect(component.form.getRawValue()).toEqual(
        warrantyItemsFormInitialValues
      )
    })

    it('sets correct form values', () => {
      mockForm(component)
      fixture.detectChanges()

      const expectedValues = {
        ...expectedFormValues,
        attachments: [
          { ...mockDocument, id: component.form.value.attachments[0].id }
        ]
      }
      expect(component.form.value as WarrantyItem).toEqual(expectedValues)
    })

    it('required errors are shown', () => {
      component.form.markAllAsTouched()
      component.onSubmit()
      fixture.detectChanges()

      const assetRequiredError = fixture.debugElement.query(
        By.css('[data-testid="affected-asset-required-error"]')
      )
      const itemRequiredError = fixture.debugElement.query(
        By.css('[data-testid="selected-item-required-error"]')
      )
      const breakdownDateError = fixture.debugElement.query(
        By.css('[data-testid="breakdown-date-required-error"]')
      )
      const warrantyReasonError = fixture.debugElement.query(
        By.css('[data-testid="warranty-reason-required-error"]')
      )
      expect(assetRequiredError).toBeTruthy()
      expect(itemRequiredError).toBeTruthy()
      expect(breakdownDateError).toBeTruthy()
      expect(warrantyReasonError).toBeTruthy()
    })
  })

  describe('attachment', () => {
    it('show attachment modal', () => {
      const addAttachmentModal = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-add-attachment"]')
      )
      expect(addAttachmentModal).toBeTruthy()
    })

    it('add attachment to attachment list', () => {
      component.addAttachmentToWarranty(mockDocument)
      fixture.detectChanges()

      const attachmentList = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-attachment-list"]')
      )
      expect(attachmentList).toBeTruthy()
    })

    it('remove attachment', () => {
      component.addAttachmentToWarranty({ ...mockDocument })
      component.addAttachmentToWarranty({ ...mockDocument })
      fixture.detectChanges()

      const secondDocument = component.attachments.value[1].id

      // remove first document
      component.removeAttachment(component.attachments.value[0].id!)
      fixture.detectChanges()

      expect(component.attachments.value.length).toBe(1)
      expect(component.attachments.value).toEqual([
        { ...mockDocument, id: secondDocument }
      ])
    })
  })

  describe('warranty item table', () => {
    it('show table after valid form is submitted', async () => {
      mockForm(component)
      component.form.markAllAsTouched()
      fixture.detectChanges()
      await fixture.whenStable()

      const warrantyItemForm = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-form"]')
      )
      const warrantyItemTable = fixture.debugElement.query(
        By.css('[data-testid="warranty-item-table"]')
      )
      expect(warrantyItemForm).toBeFalsy()
      expect(warrantyItemTable).toBeTruthy()
    })
  })
})
