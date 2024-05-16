import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SiteSettingsOverviewComponent } from './site-settings-overview.component'

describe('SiteSettingsOverviewComponent', () => {
  let component: SiteSettingsOverviewComponent
  let fixture: ComponentFixture<SiteSettingsOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [SiteSettingsOverviewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSettingsOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
