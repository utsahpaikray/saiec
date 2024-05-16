import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { TicketsComponent } from './tickets.component'
import { StoreModule } from '@ngrx/store'

describe('TicketsComponent', () => {
  let component: TicketsComponent
  let fixture: ComponentFixture<TicketsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketsComponent],
      imports: [getTranslocoModule(), StoreModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
