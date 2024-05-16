import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CookiebotService } from '@core/cookiebot/cookiebot.service'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { FooterComponent } from './footer.component'

describe('FooterComponent', () => {
  let component: FooterComponent
  let fixture: ComponentFixture<FooterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [getTranslocoModule()],
      providers: [
        {
          provide: CookiebotService,
          useValue: jasmine.createSpyObj<CookiebotService>('CookiebotService', {
            renew: undefined
          })
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
