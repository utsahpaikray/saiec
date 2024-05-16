import { TestBed } from '@angular/core/testing'
import { SiteHomeService } from './site-home.service'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TranslocoLocaleModule } from '@ngneat/transloco-locale'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { currentUserFeature } from '@stores/current-user/current-user.state'
import { firstValueFrom } from 'rxjs'
import { SiteSegment } from '@stores/site-details/interfaces/site-detail.interface'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'

const MOCK_USER = {
  name: 'user'
}

const MOCK_SEGMENTS = [SiteSegment.Warehousing]

describe('SiteHomeService', () => {
  let service: SiteHomeService
  let mockStore: MockStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule(), TranslocoLocaleModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: currentUserFeature.selectCurrentUser,
              value: MOCK_USER
            },
            {
              selector: siteDetailFeature.selectSegments,
              value: MOCK_SEGMENTS
            }
          ]
        })
      ]
    })
    mockStore = TestBed.inject(MockStore)
    service = TestBed.inject(SiteHomeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  it('should return the current user name in the VM', async () => {
    const vm = await firstValueFrom(service.getVM$())
    expect(vm.name).toEqual(MOCK_USER.name)
  })
  it('should return Warehousing news if the segment is Warehousing', async () => {
    mockStore.overrideSelector(siteDetailFeature.selectSegments, [
      SiteSegment.Warehousing
    ])
    const vm = await firstValueFrom(service.getVM$())
    const segmentRealtedCard = vm.siteNewsVM.cards.find(
      (card) => card.labels.title === 'Dashboard.WarehouseTitle'
    )
    expect(segmentRealtedCard).toBeTruthy()
  })
  it('should return Warehousing news if the segment is Amazon', async () => {
    mockStore.overrideSelector(siteDetailFeature.selectSegments, [
      SiteSegment.Amazon
    ])
    const vm = await firstValueFrom(service.getVM$())
    const segmentRealtedCard = vm.siteNewsVM.cards.find(
      (card) => card.labels.title === 'Dashboard.WarehouseTitle'
    )
    expect(segmentRealtedCard).toBeTruthy()
  })
  it('should return Airport news if the segment is Airports', async () => {
    mockStore.overrideSelector(siteDetailFeature.selectSegments, [
      SiteSegment.Airports
    ])
    const vm = await firstValueFrom(service.getVM$())
    const segmentRealtedCard = vm.siteNewsVM.cards.find(
      (card) => card.labels.title === 'Dashboard.AirportTitle'
    )
    expect(segmentRealtedCard).toBeTruthy()
  })
  it('should return Parcel news if the segment is Parcel', async () => {
    mockStore.overrideSelector(siteDetailFeature.selectSegments, [
      SiteSegment.Parcel
    ])
    const vm = await firstValueFrom(service.getVM$())
    const segmentRealtedCard = vm.siteNewsVM.cards.find(
      (card) => card.labels.title === 'Dashboard.ParcelTitle'
    )
    expect(segmentRealtedCard).toBeTruthy()
  })
  it('should return NO news if the segment is NotApplicable', async () => {
    mockStore.overrideSelector(siteDetailFeature.selectSegments, [
      SiteSegment.NotApplicable
    ])
    const vm = await firstValueFrom(service.getVM$())
    const segmentRealtedCard = vm.siteNewsVM.cards.find((card) =>
      [
        'Dashboard.WarehouseTitle',
        'Dashboard.AirportTitle',
        'Dashboard.ParcelTitle'
      ].includes(card.labels.title)
    )
    expect(segmentRealtedCard).toBeFalsy()
  })
})
