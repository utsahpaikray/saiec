import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SitesComponent } from './sites.component'

describe('SitesComponent', () => {
  let component: SitesComponent
  let fixture: ComponentFixture<SitesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SitesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
