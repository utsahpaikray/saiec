import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PortalComponent } from './portal.component'

describe('PortalComponent', () => {
  let component: PortalComponent
  let fixture: ComponentFixture<PortalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
