import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { ContextualCollaborationComponent } from './contextual-collaboration.component'

describe('ContextualCollaborationComponent', () => {
  let component: ContextualCollaborationComponent
  let fixture: ComponentFixture<ContextualCollaborationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextualCollaborationComponent],
      imports: [getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(ContextualCollaborationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
