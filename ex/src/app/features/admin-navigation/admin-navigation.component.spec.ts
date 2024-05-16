import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { AdminNavigationComponent } from './admin-navigation.component'

describe('AdminNavigationComponent', () => {
  let component: AdminNavigationComponent
  let fixture: ComponentFixture<AdminNavigationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavigationComponent],
      imports: [getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavigationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
