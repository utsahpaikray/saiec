import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WarrantyClaimsComponent } from './warranty-claims.component'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

describe('WarrantyClaimsComponent', () => {
  let component: WarrantyClaimsComponent
  let fixture: ComponentFixture<WarrantyClaimsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarrantyClaimsComponent],
      imports: [getTranslocoModule()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(WarrantyClaimsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
