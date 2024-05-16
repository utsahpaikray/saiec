import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DIALOG_DATA, DIALOG_REF, DialogRef } from '@core/dialog/dialog.service'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { CopyToClipboardDirective } from '@shared/directives/copy-to-clipboard/copy-to-clipboard.directive'
import { ClipboardStoreModule } from '@stores/clipboard/clipboard.module'
import { maximoAssetsFeature } from '@stores/maximo-assets/maximo-assets.state'
import { of } from 'rxjs'
import { AssetDetailsModalComponent } from './asset-details-modal.component'
import { MockAssetDetailsModalVM } from './asset-details-modal.component.mock'

const MockCurrentMaximoAsset = {
  id: 'Asset ID',
  siteId: '1',
  markCode: '1',
  markNumber: '1',
  description: 'test description',
  revision: '1.0'
}

describe('AssetDetailsModalComponent', () => {
  let component: AssetDetailsModalComponent
  let fixture: ComponentFixture<AssetDetailsModalComponent>
  let dialogRef: jest.Mocked<DialogRef>
  let mockStore: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AssetDetailsModalComponent,
        getTranslocoModule(),
        CopyToClipboardDirective,
        ClipboardStoreModule,
        EffectsModule.forRoot({}),
        StoreModule.forRoot({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: maximoAssetsFeature.selectCurrentMaximoAssetNotLoading,
              value: MockCurrentMaximoAsset
            }
          ]
        }),
        {
          provide: DIALOG_DATA,
          useValue: MockAssetDetailsModalVM
        },
        {
          provide: DIALOG_REF,
          useValue: {
            result$: of(null),
            close: () => {}
          }
        }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsModalComponent)
    component = fixture.componentInstance

    dialogRef = TestBed.inject(DIALOG_REF) as jest.Mocked<DialogRef>

    mockStore = TestBed.inject(MockStore)

    fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show the title', () => {
    const title = fixture.nativeElement.querySelector('[card-title]')
    expect(title.textContent).toBe(MockAssetDetailsModalVM.titleKey)
  })

  it('should show the subTitleValue as assetID', () => {
    const subTitle = fixture.nativeElement.querySelector('[card-subtitle]')
    expect(subTitle.textContent).toBe(MockCurrentMaximoAsset.id)
  })

  it('should show close icon button', () => {
    const closeButton = fixture.nativeElement.querySelector(
      '[card-suffix-button]'
    )
    expect(closeButton).toBeTruthy()
  })

  it('should close the modal when close button is clicked', () => {
    const spyClose = jest.spyOn(dialogRef, 'close')
    const closeButton = fixture.nativeElement.querySelector(
      '[card-suffix-button]'
    )

    closeButton.click()
    expect(spyClose).toHaveBeenCalled()
  })

  it('should show markCode key', () => {
    const markCodeKey = fixture.debugElement.query(
      By.css('[data-testid="markcode"] > [grav-key]')
    )
    expect(markCodeKey.nativeElement.textContent).toBe(
      MockAssetDetailsModalVM.markCodeKey
    )
  })

  it('should show markCode value', () => {
    const markCodeValue = fixture.debugElement.query(
      By.css('[data-testid="markcode"] > [grav-value]')
    )
    expect(markCodeValue.nativeElement.textContent).toBe(
      MockCurrentMaximoAsset.markCode
    )
  })

  it('should show markNumber key', () => {
    const markNumberKey = fixture.debugElement.query(
      By.css('[data-testid="mark-number"] > [grav-key]')
    )
    expect(markNumberKey.nativeElement.textContent).toBe(
      MockAssetDetailsModalVM.markNumberKey
    )
  })

  it('should show markNumber value', () => {
    const markNumberValue = fixture.debugElement.query(
      By.css('[data-testid="mark-number"] > [grav-value]')
    )
    expect(markNumberValue.nativeElement.textContent).toBe(
      MockCurrentMaximoAsset.markNumber
    )
  })

  it('should show description key', () => {
    const descriptionKey = fixture.debugElement.query(
      By.css('[data-testid="description"] > [grav-key]')
    )
    expect(descriptionKey.nativeElement.textContent).toBe(
      MockAssetDetailsModalVM.descriptionKey
    )
  })

  it('should show description value', () => {
    const descriptionValue = fixture.debugElement.query(
      By.css('[data-testid="description"] > [grav-value]')
    )
    expect(descriptionValue.nativeElement.textContent).toBe(
      MockCurrentMaximoAsset.description
    )
  })

  it('should close the dialog if asset is not found', () => {
    const spyClose = jest.spyOn(dialogRef, 'close')

    mockStore.overrideSelector(
      maximoAssetsFeature.selectCurrentMaximoAssetNotLoading,
      null
    )
    mockStore.refreshState()
    component.fetchAssetFailed$.subscribe()

    expect(spyClose).toHaveBeenCalled()
  })
})
