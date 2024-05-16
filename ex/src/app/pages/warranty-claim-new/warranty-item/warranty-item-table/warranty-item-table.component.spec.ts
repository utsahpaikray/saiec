import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Asset } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { mockDocuments } from '@features/attachment-list/attachment-list.component.spec'
import { TranslocoService } from '@ngneat/transloco'
import { WarrantyItem } from '@pages/warranty-claim-new/warranty-create-form.interface'
import { of } from 'rxjs'
import { WarrantyItemTableComponent } from './warranty-item-table.component'

const mockItemDetails: Partial<WarrantyItem> = {
  asset: {
    customerNumber: '',
    description: 'Twin Belt',
    markCode: 'TB',
    markNumber: '1401.77.002.000',
    siteId: '2315962',
    systemComponentId: 'A_SYS29638565'
  } as Asset,
  breakdownDate: '2023-08-26',
  item: {
    description: 'Standard Earth Litz 10mm² / M6 - M6 / 0,5mtr',
    itemNumber: '0G0027-130-10500',
    sparePartCategory: null,
    systemComponentId: 'A_SYS32685843'
  } as Asset,
  itemQuantity: '1',
  serialNumber: 'test serial number',
  warrantyInfo: 'Active',
  warrantyReason: 'test warranty reason',
  attachments: [...mockDocuments]
}

describe('WarrantyItemTableComponent', () => {
  let component: WarrantyItemTableComponent
  let fixture: ComponentFixture<WarrantyItemTableComponent>
  let windowResizeService: WindowResizeService
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        WarrantyItemTableComponent,
        HttpClientModule,
        getTranslocoModule()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    fixture = TestBed.createComponent(WarrantyItemTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    windowResizeService = TestBed.inject(WindowResizeService)
    translocoService = TestBed.inject(TranslocoService)
  })

  describe('on desktop', () => {
    beforeEach(() => {
      component.isTable$ = of(true)
      component.itemDetails = mockItemDetails
      fixture.detectChanges()
    })

    it('show item correctly in table', async () => {
      await fixture.whenStable()

      const itemTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-table-column"]')
      )
      expect(itemTableColumn).toBeFalsy()

      const itemTableRow = fixture.debugElement.query(
        By.css('[data-testid="item-table-row"]')
      )
      expect(itemTableRow.children[0].nativeElement.innerText).toBe(
        mockItemDetails.asset?.markCode
      )
      expect(itemTableRow.children[1].nativeElement.innerText).toBe(
        mockItemDetails.asset?.markNumber
      )
      expect(itemTableRow.children[2].nativeElement.innerText).toBe(
        mockItemDetails.asset?.description
      )
      expect(itemTableRow.children[3].nativeElement.innerText).toBe(
        mockItemDetails.item?.itemNumber
      )
      expect(itemTableRow.children[4].nativeElement.innerText).toBe(
        mockItemDetails.item?.description
      )
      expect(itemTableRow.children[5].nativeElement.innerText).toBe(
        mockItemDetails.itemQuantity
      )
      expect(itemTableRow.children[6].nativeElement.innerText).toBe(
        mockItemDetails.breakdownDate
      )
      expect(itemTableRow.children[7].nativeElement.innerText).toBe(
        mockDocuments.length.toString()
      )
    })

    it('show correct headers', async () => {
      fixture.detectChanges()
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="item-table-header"]')
      )
      expect(tableHeaders.length).toEqual(8)

      for (const [i, tableHeader] of tableHeaders.entries()) {
        expect(tableHeader.nativeElement.innerText).toBe(
          translocoService.translate(component.headers[i])
        )
      }
    })
  })

  describe('on mobile', () => {
    beforeEach(() => {
      component.isTable$ = of(false)
      component.itemDetails = mockItemDetails
      fixture.detectChanges()
    })

    it('show table in columns', async () => {
      await fixture.whenStable()

      const itemTableRow = fixture.debugElement.query(
        By.css('[data-testid="item-table-row"]')
      )
      expect(itemTableRow).toBeFalsy()

      const markCodeTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-mark-code"]')
      )
      const markNumberTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-mark-number"]')
      )
      const assetDescriptionTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-asset-description"]')
      )
      const itemNumberTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-item-number"]')
      )
      const itemDescriptionTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-item-description"]')
      )
      const itemQuantityTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-item-quantity"]')
      )
      const breakdownDateTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-breakdown-date"]')
      )
      const attachmentsTableColumn = fixture.debugElement.query(
        By.css('[data-testid="item-column-attachments"]')
      )
      expect(markCodeTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.asset?.markCode
      )
      expect(markNumberTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.asset?.markNumber
      )
      expect(assetDescriptionTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.asset?.description
      )
      expect(itemNumberTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.item?.itemNumber
      )
      expect(itemDescriptionTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.item?.description
      )
      expect(itemQuantityTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.itemQuantity
      )
      expect(breakdownDateTableColumn.nativeElement.innerText).toBe(
        mockItemDetails.breakdownDate
      )
      expect(attachmentsTableColumn.nativeElement.innerText).toBe(
        mockDocuments.length.toString()
      )
    })
  })
})
