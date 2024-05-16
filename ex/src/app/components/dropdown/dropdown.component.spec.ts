import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { DropdownComponent } from './dropdown.component'

describe('DropdownComponent', () => {
  let component: DropdownComponent
  let fixture: ComponentFixture<DropdownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should disable the input', async () => {
    component.isDisabled = true
    fixture.detectChanges()

    const dropdownButton = fixture.debugElement.query(
      By.css('[data-testid="dropdown-button"]')
    )
    dropdownButton.nativeElement.click()
    await fixture.whenStable()
    expect(component.isOpen).toBe(false)
  })

  it('should not have max amount of text lines', () => {
    const dropdownText = fixture.debugElement.query(
      By.css('[data-testid="dropdown-text"]')
    )

    expect(
      dropdownText.nativeElement.classList.contains('max-h-10')
    ).toBeFalsy()
    expect(
      dropdownText.nativeElement.classList.contains('line-clamp-2')
    ).toBeFalsy()
  })

  it('should have max amount of text lines', () => {
    component.hasMaxTwoTextLines = true
    fixture.detectChanges()

    const dropdownText = fixture.debugElement.query(
      By.css('[data-testid="dropdown-text"]')
    )

    expect(
      dropdownText.nativeElement.classList.contains('max-h-10')
    ).toBeTruthy()
    expect(
      dropdownText.nativeElement.classList.contains('line-clamp-2')
    ).toBeTruthy()
  })

  it('should show info text', () => {
    component.infoText = 'info text'
    fixture.detectChanges()

    const infoText = fixture.debugElement.query(
      By.css('[data-testid="info-text"]')
    )
    expect(infoText).toBeTruthy()
  })
})
