import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SiteSettingsComponent } from './site-settings.component'
import { StoreModule } from '@ngrx/store'

describe('SiteSettingsComponent', () => {
  let component: SiteSettingsComponent
  let fixture: ComponentFixture<SiteSettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteSettingsComponent],
      imports: [getTranslocoModule(), StoreModule.forRoot()],
      providers: [
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
