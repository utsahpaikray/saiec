import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SearchInputComponent } from '@components/search-input/search-input.component'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { DocumentSearchBarComponent } from './document-search-bar.component'

describe('DocumentSearchBarComponent', () => {
  let component: DocumentSearchBarComponent
  let fixture: ComponentFixture<DocumentSearchBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [DocumentSearchBarComponent, SearchInputComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSearchBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('submits form when clicking submit button', () => {
    spyOn(component, 'onSubmit').and.callThrough()
    const submitButton = fixture.debugElement.query(
      By.css('[data-testid="document-search-submit-button"]')
    )
    submitButton.nativeElement.click()

    expect(component.onSubmit).toHaveBeenCalled()
  })
})
