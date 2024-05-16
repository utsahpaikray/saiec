import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { AccessDeniedComponent } from './access-denied.component'

describe('AccessDeniedComponent', () => {
  let component: AccessDeniedComponent
  let fixture: ComponentFixture<AccessDeniedComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessDeniedComponent],
      imports: [getTranslocoModule(), RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(AccessDeniedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
