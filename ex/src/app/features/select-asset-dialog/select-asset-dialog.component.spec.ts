import { HttpClientModule } from '@angular/common/http'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Asset, CollectionSegmentInfo, Scalars } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoService } from '@ngneat/transloco'
import { AngularSvgIconModule } from 'angular-svg-icon'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'

import { CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core'
import { DialogRef, DIALOG_DATA, DIALOG_REF } from '@core/dialog/dialog.service'
import { MockDialogService } from '@core/dialog/dialog.service.mock'
import { of } from 'rxjs'
import { SelectAssetDialogComponent } from './select-asset-dialog.component'

type InternalDialogRef = Pick<DialogRef, 'close'>

export const mockAssets = [
  {
    description: 'Zone',
    markCode: 'ZONE',
    markNumber: '1812.01.000.000',
    siteId: '2315962',
    customerNumber: 'ID-11111-11',
    systemComponentId: 'SYS45167350',
    __typename: 'Asset'
  },
  {
    description: 'BHS Server Rack R04',
    markCode: 'CCC',
    markNumber: '0911.04.000.000',
    siteId: '2315962',
    customerNumber: '',
    systemComponentId: 'SYS45167351',
    __typename: 'Asset'
  },
  {
    description: 'Signal Light Column',
    markCode: 'SLC',
    markNumber: '1691.00.078.000',
    siteId: '2315962',
    customerNumber: '',
    systemComponentId: 'SYS45167352',
    __typename: 'Asset'
  },
  {
    description: 'Local Controls Cabinet',
    markCode: 'LCC',
    markNumber: '1112.49.097.000',
    siteId: '2315962',
    customerNumber: '',
    systemComponentId: 'SYS45167353',
    __typename: 'Asset'
  }
] as Asset[]

export let mockAssetsCount: Scalars['Int'] = 15000

export let mockPageInfo: CollectionSegmentInfo = {
  hasNextPage: true,
  hasPreviousPage: false,
  __typename: 'CollectionSegmentInfo'
}

describe('SelectAssetDialogComponent', () => {
  let component: SelectAssetDialogComponent
  let fixture: ComponentFixture<SelectAssetDialogComponent>
  let dialogRef: InternalDialogRef = {
    close: () => {}
  }
  let translocoService: TranslocoService
  let controller: ApolloTestingController
  let viewContainerRef: ViewContainerRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SelectAssetDialogComponent,
        HttpClientModule,
        ApolloTestingModule,
        getTranslocoModule(),
        AngularSvgIconModule.forRoot()
      ],
      providers: [
        {
          provide: MockDialogService,
          useValue: MockDialogService
        },
        {
          provide: DIALOG_DATA,
          useValue: {
            siteId$: of('testSiteId')
          }
        },
        {
          provide: DIALOG_REF,
          useValue: {
            result$: of(null),
            close: () => {}
          }
        },
        ViewContainerRef
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(SelectAssetDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    dialogRef = TestBed.inject(DIALOG_REF)
    controller = TestBed.inject(ApolloTestingController)
    translocoService = TestBed.inject(TranslocoService)

    viewContainerRef = TestBed.inject(ViewContainerRef)
  })

  it('closes the modal', fakeAsync(() => {
    const dialogCloseButton = fixture.debugElement.query(
      By.css(`[data-testid="asset-dialog-close-button"]`)
    )
    spyOn(dialogRef, 'close').and.callThrough()
    dialogCloseButton.triggerEventHandler('click', null)
    tick(300)
    expect(dialogRef.close).toHaveBeenCalledWith(null)
  }))

  describe('asset table', () => {
    it('should not show asset if asset header does not exist', () => {
      component.headers$ = of(['...component.headers'])
      fixture.detectChanges()
      expect(component.headers$).not.toContain('Asset')
    })

    it('should show no assets text', () => {
      component.assetSearch$ = of({
        assets: [],
        loadMoreLoading: false,
        totalCounts: 0,
        hasMoreAssets: false,
        hasAssets: false,
        initialLoading: false
      })
      fixture.detectChanges()

      const noAssetsText = fixture.debugElement.query(
        By.css(`[data-testid="no-assets-text"]`)
      )
      expect(noAssetsText).toBeTruthy()
    })

    it('should show correct table rows and asset data', async () => {
      mockAssetsCount = 15000
      component.assetSearch$ = of({
        assets: mockAssets,
        loadMoreLoading: false,
        totalCounts: mockAssetsCount,
        hasMoreItems: true,
        hasAssets: true,
        initialLoading: false,
        hasCustomerNumber: true
      })
      fixture.detectChanges()

      const assetCount = fixture.debugElement.query(
        By.css(`[data-testid="asset-load-more-paginator"]`)
      )
      await expect(assetCount.nativeElement.innerText.trim()).toBe(
        'Showing 4 of 15000'
      )

      const table = fixture.debugElement.queryAll(
        By.css(`[data-testid="asset-table"]`)
      )
      await expect(table).toBeTruthy()

      const markCodes = fixture.debugElement.queryAll(
        By.css(`[data-testid="table-mark-code"]`)
      )
      const markNumbers = fixture.debugElement.queryAll(
        By.css(`[data-testid="table-mark-number"]`)
      )
      const descriptions = fixture.debugElement.queryAll(
        By.css(`[data-testid="table-description"]`)
      )
      await expect(markCodes[0].nativeElement.innerText.trim()).toBe(
        mockAssets[0].markCode
      )
      await expect(markNumbers[0].nativeElement.innerText.trim()).toBe(
        mockAssets[0].markNumber
      )
      await expect(descriptions[0].nativeElement.innerText.trim()).toBe(
        mockAssets[0].description
      )
    })

    it('show load more button', () => {
      component.assetSearch$ = of({
        assets: mockAssets,
        loadMoreLoading: false,
        totalCounts: mockAssetsCount,
        hasMoreItems: true,
        hasAssets: true,
        initialLoading: false,
        hasCustomerNumber: true
      })
      fixture.detectChanges()

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="asset-list-load-more"]')
      )
      expect(loadMoreButton).toBeTruthy()
    })

    it('should not show load more button', () => {
      component.assets$ = of([...mockAssets])
      component.totalCount$ = of(mockAssetsCount)
      component.initialLoading$ = of(false)
      component.hasMoreAssets$ = of(false)
      fixture.detectChanges()

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="asset-list-load-more"]')
      )
      expect(loadMoreButton).toBeFalsy()
    })
  })

  it('should set selected asset, button text and close modal when clicks on add item button', async () => {
    component.assetSearch$ = of({
      assets: mockAssets,
      loadMoreLoading: false,
      totalCounts: mockAssetsCount,
      hasMoreItems: true,
      hasAssets: true,
      initialLoading: false,
      hasCustomerNumber: true
    })
    fixture.detectChanges()
    spyOn(dialogRef, 'close').and.callThrough()
    const firstAddItemButton = fixture.debugElement.query(
      By.css(`[data-testid="add-item-button-0"]`)
    )

    firstAddItemButton.triggerEventHandler('click', null)
    expect(dialogRef.close).toHaveBeenCalledWith(mockAssets[0])
  })
})
