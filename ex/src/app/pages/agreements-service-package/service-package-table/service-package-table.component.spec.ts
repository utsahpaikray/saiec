import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import enData from '@assets/i18n/en-US.json'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoService } from '@ngneat/transloco'
import { of } from 'rxjs'
import { mockContractLine } from '../agreements-service-package.mock'
import { ServicePackageTableComponent } from './service-package-table.component'

describe('ServicePackageTableComponent', () => {
  let component: ServicePackageTableComponent
  let fixture: ComponentFixture<ServicePackageTableComponent>
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServicePackageTableComponent, getTranslocoModule()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    fixture = TestBed.createComponent(ServicePackageTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    translocoService = TestBed.inject(TranslocoService)
  })

  it('should show no contracts text', () => {
    component.contractLines = []
    fixture.detectChanges()

    const noContractsMessage = fixture.debugElement.query(
      By.css('[data-testid="service-table-message"]')
    )
    expect(noContractsMessage).toBeTruthy()

    const servicePackageTable = fixture.debugElement.query(
      By.css('[data-testid="service-package-table"]')
    )
    const servicePackageList = fixture.debugElement.query(
      By.css('[data-testid="service-package-card-list"]')
    )
    expect(servicePackageTable).toBeFalsy()
    expect(servicePackageList).toBeFalsy()
  })

  describe('on desktop', () => {
    beforeEach(() => {
      component.isTable$ = of(true)
      component.contractLines = [{ ...mockContractLine }]
      fixture.detectChanges()
    })

    it('should show correct headers', () => {
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="table-header"]')
      )

      for (const [i, tableHeader] of tableHeaders.entries()) {
        expect(tableHeader.nativeElement.innerText).toBe(
          translocoService.translate(`General.${component.headers[i]}`)
        )
      }
    })

    it('should show correct table contents', () => {
      const date = fixture.debugElement.query(
        By.css('[data-testid="table-start-end-date"]')
      )
      const availability = fixture.debugElement.query(
        By.css('[data-testid="table-availability"]')
      )
      const parts = fixture.debugElement.query(
        By.css('[data-testid="table-parts"]')
      )
      const labour = fixture.debugElement.query(
        By.css('[data-testid="table-labor"]')
      )
      const calendar = fixture.debugElement.query(
        By.css('[data-testid="table-calendar"]')
      )
      const phone = fixture.debugElement.query(
        By.css('[data-testid="table-phone"]')
      )
      const site = fixture.debugElement.query(
        By.css('[data-testid="table-on-site"]')
      )
      const visits = fixture.debugElement.query(
        By.css('[data-testid="table-visits"]')
      )
      const manpower = fixture.debugElement.query(
        By.css('[data-testid="table-manpower"]')
      )

      expect(date.nativeElement.textContent.trim()).toEqual(
        `Jan 1, 2016  -  Jan 1, 2023`
      )
      expect(availability.nativeElement.textContent.trim()).toEqual(`8/5`)
      expect(parts.nativeElement.textContent.trim()).toEqual(
        `${enData.General.Yes}`
      )
      expect(labour.nativeElement.textContent.trim()).toEqual(
        `${enData.General.No}`
      )
      expect(calendar.nativeElement.textContent.trim()).toEqual(
        mockContractLine.calendarDescription
      )
      expect(phone.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(mockContractLine.byphone!)
      )
      expect(site.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(mockContractLine.onsite!)
      )
      expect(visits.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(mockContractLine.yearvisits!)
      )
      expect(manpower.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(
          mockContractLine.vidays! + mockContractLine.subcdays!
        )
      )
    })

    describe('should set correct markcode or system content', () => {
      it(`should use 'system'`, () => {
        const markcodeSystem = fixture.debugElement.query(
          By.css('[data-testid="table-mark-code-system"]')
        )
        expect(markcodeSystem.nativeElement.textContent.trim()).toEqual(
          `${enData.Contracts.WholeSystem}`
        )
      })

      it(`should use 'assetType'`, async () => {
        const mockSystemComponent = {
          system: '',
          markCode: 'LFT',
          markCodeDescription: 'Lift',
          assetType: 'LFTA',
          assetMarkNumber: null,
          assetTypeDescription: ''
        }
        component.contractLines = [
          { ...mockContractLine, systemComponent: mockSystemComponent }
        ]
        fixture.detectChanges()

        const markcodeSystem = fixture.debugElement.query(
          By.css('[data-testid="table-mark-code-system"]')
        )
        expect(markcodeSystem.nativeElement.textContent.trim()).toEqual(
          mockContractLine.systemComponent?.assetType
        )
      })

      it(`should use 'assetType' and 'assetDescription'`, () => {
        const mockSystemComponent = {
          system: '',
          markCode: 'LFT',
          markCodeDescription: 'Lift',
          assetType: 'LFTA',
          assetMarkNumber: null,
          assetTypeDescription: 'Lift Asset'
        }
        component.contractLines = [
          { ...mockContractLine, systemComponent: mockSystemComponent }
        ]
        fixture.detectChanges()

        const markcodeSystem = fixture.debugElement.query(
          By.css('[data-testid="table-mark-code-system"]')
        )
        expect(markcodeSystem.nativeElement.textContent.trim()).toEqual(
          `${mockContractLine.systemComponent?.assetType} (${mockContractLine.systemComponent?.assetTypeDescription})`
        )
      })

      it(`should use 'markCode'`, () => {
        const mockSystemComponent = {
          system: '',
          markCode: 'LFT',
          markCodeDescription: '',
          assetType: '',
          assetMarkNumber: null,
          assetTypeDescription: ''
        }
        component.contractLines = [
          { ...mockContractLine, systemComponent: mockSystemComponent }
        ]
        fixture.detectChanges()

        const markcodeSystem = fixture.debugElement.query(
          By.css('[data-testid="table-mark-code-system"]')
        )
        expect(markcodeSystem.nativeElement.textContent.trim()).toEqual(
          mockContractLine.systemComponent?.markCode
        )
      })

      it(`should use 'markCode' and 'markCodeDescription'`, () => {
        const mockSystemComponent = {
          system: '',
          markCode: 'LFT',
          markCodeDescription: 'Lift',
          assetType: '',
          assetMarkNumber: null,
          assetTypeDescription: ''
        }
        component.contractLines = [
          { ...mockContractLine, systemComponent: mockSystemComponent }
        ]
        fixture.detectChanges()

        const markcodeSystem = fixture.debugElement.query(
          By.css('[data-testid="table-mark-code-system"]')
        )
        expect(markcodeSystem.nativeElement.textContent.trim()).toEqual(
          `${mockContractLine.systemComponent?.markCode} (${mockContractLine.systemComponent?.markCodeDescription})`
        )
      })
    })

    describe('start date and end date', () => {
      it('should show no start date text', () => {
        component.contractLines = [{ ...mockContractLine, startDate: null }]
        fixture.detectChanges()

        const date = fixture.debugElement.query(
          By.css('[data-testid="table-start-end-date"]')
        )
        expect(date.nativeElement.textContent.trim()).toEqual(
          `${enData.General.NoStartDate}  -  Jan 1, 2023`
        )
      })

      it('should show no end date text', () => {
        component.contractLines = [{ ...mockContractLine, endDate: null }]
        fixture.detectChanges()

        const date = fixture.debugElement.query(
          By.css('[data-testid="table-start-end-date"]')
        )
        expect(date.nativeElement.textContent.trim()).toEqual(
          `Jan 1, 2016  -  ${enData.General.NoEndDate}`
        )
      })
    })
  })

  describe('on mobile', () => {
    beforeEach(() => {
      component.isTable$ = of(false)
      component.contractLines = [{ ...mockContractLine }]
      fixture.detectChanges()
    })

    it('should show correct card headers', () => {
      const tableHeaders = fixture.debugElement.queryAll(
        By.css('[data-testid="card-list-header"]')
      )

      for (const [i, tableHeader] of tableHeaders.entries()) {
        expect(tableHeader.nativeElement.innerText).toBe(
          translocoService.translate(`General.${component.headers[i]}`)
        )
      }
    })

    it('should show correct card contents', () => {
      const tableRow = fixture.debugElement.query(
        By.css('[data-testid="table-contract-line"]')
      )
      expect(tableRow).toBeFalsy()

      const cardList = fixture.debugElement.query(
        By.css('[data-testid="service-package-card-list"]')
      )
      expect(cardList).toBeTruthy()

      const markcodeSystem = fixture.debugElement.query(
        By.css('[data-testid="card-mark-code-system"]')
      )
      const date = fixture.debugElement.query(
        By.css('[data-testid="card-start-end-date"]')
      )
      const availability = fixture.debugElement.query(
        By.css('[data-testid="card-availability"]')
      )
      const parts = fixture.debugElement.query(
        By.css('[data-testid="card-parts"]')
      )
      const labour = fixture.debugElement.query(
        By.css('[data-testid="card-labor"]')
      )
      const calendar = fixture.debugElement.query(
        By.css('[data-testid="card-calendar"]')
      )
      const phone = fixture.debugElement.query(
        By.css('[data-testid="card-phone"]')
      )
      const site = fixture.debugElement.query(
        By.css('[data-testid="card-on-site"]')
      )
      const visits = fixture.debugElement.query(
        By.css('[data-testid="card-visits"]')
      )
      const manpower = fixture.debugElement.query(
        By.css('[data-testid="card-manpower"]')
      )

      expect(markcodeSystem).toBeTruthy()
      expect(date.nativeElement.textContent.trim()).toEqual(
        `Jan 1, 2016  -  Jan 1, 2023`
      )
      expect(availability.nativeElement.textContent.trim()).toEqual(`8/5`)
      expect(parts.nativeElement.textContent.trim()).toEqual(
        `${enData.General.Yes}`
      )
      expect(labour.nativeElement.textContent.trim()).toEqual(
        `${enData.General.No}`
      )
      expect(calendar.nativeElement.textContent.trim()).toEqual(
        mockContractLine.calendarDescription
      )
      expect(phone.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(mockContractLine.byphone!)
      )
      expect(site.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(mockContractLine.onsite!)
      )
      expect(visits.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(mockContractLine.yearvisits!)
      )
      expect(manpower.nativeElement.textContent.trim()).toEqual(
        component.roundValueToTwoDecimals(
          mockContractLine.vidays! + mockContractLine.subcdays!
        )
      )
    })
  })
})
