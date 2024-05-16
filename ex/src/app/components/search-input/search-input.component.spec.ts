import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

import { SearchInputComponent } from './search-input.component'

describe('SearchInputComponent', () => {
  let component: SearchInputComponent
  let fixture: ComponentFixture<SearchInputComponent>

  const searchText = 'doc'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchInputComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should display correct search text', async () => {
    component.searchText = searchText
    fixture.detectChanges()

    const searchInput = fixture.debugElement.query(
      By.css('[data-testid="search-input"]')
    )
    await fixture.whenStable()
    expect(searchInput.nativeElement.value).toBe(searchText)
  })

  it('should show info text', () => {
    component.infoText = 'info text'
    fixture.detectChanges()

    const infoText = fixture.debugElement.query(
      By.css('[data-testid="info-text"]')
    )
    const searchInput = fixture.debugElement.query(
      By.css('[data-testid="search-input"]')
    )
    expect(infoText).toBeTruthy()
    expect(searchInput.nativeElement.classList).not.toContain('mb-2')
  })

  it('should show button on input focus', async () => {
    component.searchText = searchText
    const searchInput = fixture.debugElement.query(
      By.css('[data-testid="search-input"]')
    )
    searchInput.nativeElement.focus()
    fixture.detectChanges()

    await fixture.whenStable()
    const clearButton = fixture.debugElement.query(
      By.css('[data-testid="search-clear-button"]')
    )

    // TODO: check why this is failing
    // expect(component.focussed).toEqual(true)
    expect(clearButton).toBeTruthy()
  })

  it('should clear the search text if clear button is clicked', async () => {
    spyOn(component.changeEvent, 'emit')
    component.searchText = searchText
    component.focussed = true
    fixture.detectChanges()

    await fixture.whenStable()
    const clearButton = fixture.debugElement.query(
      By.css('[data-testid="search-clear-button"]')
    )
    clearButton.nativeElement.click()

    expect(component.searchText).toEqual('')
    expect(component.changeEvent.emit).toHaveBeenCalledOnceWith('')
    expect(component.focussed).toEqual(true)
  })
})
