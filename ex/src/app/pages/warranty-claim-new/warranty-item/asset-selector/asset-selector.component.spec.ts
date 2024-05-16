import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AssetSelectorComponent } from './asset-selector.component'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Asset } from '@core/generated/types'
import { By } from '@angular/platform-browser'
import { TranslocoService } from '@ngneat/transloco'

const siteId = 'testSiteId'

const mockSelectedAsset: Asset = {
  description: 'Zone',
  markCode: 'ZONE',
  markNumber: '1812.01.000.000',
  siteId: '2315962',
  systemComponentId: 'A_SYS28496121',
  customerNumber: 'ID-11111-11',
  revision: '',
  label: ''
}

describe('AssetSelectorComponent', () => {
  let component: AssetSelectorComponent
  let fixture: ComponentFixture<AssetSelectorComponent>
  let translocoService: TranslocoService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssetSelectorComponent, getTranslocoModule()],
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
    fixture = TestBed.createComponent(AssetSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    translocoService = TestBed.inject(TranslocoService)
  })

  it('shows select asset button with correct text', async () => {
    const selectAssetButton = fixture.debugElement.query(
      By.css('[data-testid="select-asset-button"]')
    )
    expect(selectAssetButton.nativeElement.textContent.trim()).toBe(
      translocoService.translate('Asset.SelectAssetBtn')
    )

    component.value$ = of(mockSelectedAsset)
    fixture.detectChanges()
    await fixture.whenStable()

    expect(selectAssetButton.nativeElement.textContent.trim()).toBe(
      translocoService.translate('Asset.ChangeAssetBtn')
    )
  })

  it('shows selected asset data correctly', () => {
    component.value$ = of(mockSelectedAsset)
    fixture.detectChanges()

    const selectedAssetDescription = fixture.debugElement.query(
      By.css('[data-testid="selected-asset-description"]')
    )
    const selectedAssetMarkNumber = fixture.debugElement.query(
      By.css('[data-testid="selected-asset-mark-number"]')
    )
    expect(selectedAssetDescription.nativeElement.innerText.trim()).toBe(
      mockSelectedAsset.description
    )
    expect(selectedAssetMarkNumber.nativeElement.innerText.trim()).toBe(
      mockSelectedAsset.markNumber
    )
  })
})
