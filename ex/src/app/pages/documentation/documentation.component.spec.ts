import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { DocumentationComponent } from './documentation.component'
import { StoreModule } from '@ngrx/store'

describe('DocumentationComponent', () => {
  let component: DocumentationComponent
  let fixture: ComponentFixture<DocumentationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationComponent],
      imports: [getTranslocoModule(), StoreModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
