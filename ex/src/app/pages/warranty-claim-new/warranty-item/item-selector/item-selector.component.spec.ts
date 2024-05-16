import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ItemSelectorComponent } from './item-selector.component'
import { Asset } from '@core/generated/types'
import { TranslocoService } from '@ngneat/transloco'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

const siteId = 'testSiteId'

const mockSelectedItem: Asset = {
  itemNumber: '006005-00690',
  description: 'Label self-adhesive ETS-E (ground symbol)',
  sparePartCategory: null,
  classificationLevel1: 'Mechanical component',
  classificationLevel2: 'Identification part',
  classificationLevel3: 'Sticker',
  systemComponentId: 'A_SYS28496121',
  revision: '',
  label: '',
  siteId: '2315962'
}

describe('ItemSelectorComponent', () => {
  let component: ItemSelectorComponent
  let fixture: ComponentFixture<ItemSelectorComponent>
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemSelectorComponent, getTranslocoModule()],
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
    })
    fixture = TestBed.createComponent(ItemSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    translocoService = TestBed.inject(TranslocoService)
  })

  describe('select item', () => {
    it('shows select item button with correct text', async () => {
      const selectItemButton = fixture.debugElement.query(
        By.css('[data-testid="select-item-button"]')
      )
      expect(selectItemButton.nativeElement.textContent.trim()).toBe(
        translocoService.translate('WarrantyClaims.SelectItemButton')
      )

      component.value$ = of(mockSelectedItem)
      fixture.detectChanges()
      await fixture.whenStable()

      expect(selectItemButton.nativeElement.textContent.trim()).toBe(
        translocoService.translate('WarrantyClaims.ChangeItemButton')
      )
    })

    it('shows selected item data correctly', () => {
      component.value$ = of(mockSelectedItem)
      fixture.detectChanges()

      const selectedItemNumber = fixture.debugElement.query(
        By.css('[data-testid="selected-item-number"]')
      )
      const selectedItemDescription = fixture.debugElement.query(
        By.css('[data-testid="selected-item-description"]')
      )
      expect(selectedItemNumber.nativeElement.innerText.trim()).toBe(
        mockSelectedItem.itemNumber
      )
      expect(selectedItemDescription.nativeElement.innerText.trim()).toBe(
        mockSelectedItem.description
      )
    })
  })
})
