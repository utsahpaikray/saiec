import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { PiaErrorPageComponent } from './pia-error-page.component'

describe('NotFoundComponent', () => {
  let component: PiaErrorPageComponent
  let fixture: ComponentFixture<PiaErrorPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiaErrorPageComponent],
      imports: [getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PiaErrorPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
