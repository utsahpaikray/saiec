import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TabComponent } from './tab.component'

describe('TabComponent', () => {
  let component: TabComponent
  let fixture: ComponentFixture<TabComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('creates component', () => {
    expect(component).toBeTruthy()
  })
})
