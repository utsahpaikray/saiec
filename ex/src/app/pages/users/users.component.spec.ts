import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UsersComponent } from './users.component'

describe('UsersComponent', () => {
  let component: UsersComponent
  let fixture: ComponentFixture<UsersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
