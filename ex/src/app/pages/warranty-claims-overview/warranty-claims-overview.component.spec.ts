import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { maximoFeature } from '@stores/maximo/maximo.state'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'
import { WarrantyClaimsOverviewComponent } from './warranty-claims-overview.component'

const siteId = 'testSiteId'

describe('WarrantyClaimsOverviewsComponent', () => {
  let fixture: ComponentFixture<WarrantyClaimsOverviewComponent>
  let mockStore: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WarrantyClaimsOverviewComponent,
        getTranslocoModule(),
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
        },
        provideMockStore({
          selectors: [
            {
              selector: maximoFeature.hasWriteAccessNotLoading,
              value: false
            }
          ]
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(WarrantyClaimsOverviewComponent)
    fixture.detectChanges()

    mockStore = TestBed.inject(MockStore)
  })

  it('shows create warranty claim button to navigate to create warranty claim page when user has the right access', async () => {
    mockStore.overrideSelector(maximoFeature.hasWriteAccessNotLoading, true)
    mockStore.refreshState()
    fixture.detectChanges()

    const createWarrantyButton = fixture.debugElement.query(
      By.css('[data-testid="create-warranty-claims-button"]')
    )
    expect(createWarrantyButton).toBeTruthy()
    expect(
      createWarrantyButton.nativeElement.getAttribute('ng-reflect-router-link')
    ).toBe('./new')
  })

  it('should not show create warranty claim button if users do not have the right access', () => {
    mockStore.overrideSelector(maximoFeature.hasWriteAccessNotLoading, false)
    mockStore.refreshState()
    fixture.detectChanges()

    const createWarrantyButton = fixture.debugElement.query(
      By.css('[data-testid="create-warranty-claims-button"]')
    )
    expect(createWarrantyButton).toBeFalsy()
  })
})
