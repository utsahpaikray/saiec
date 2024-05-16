import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { TextAreaComponent } from './text-area.component'

describe('TextAreaComponent', () => {
  let component: TextAreaComponent
  let fixture: ComponentFixture<TextAreaComponent>

  const text = 'doc'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, getTranslocoModule()],
      declarations: [TextAreaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should display correct text without info text and input counter', async () => {
    component.model = text
    fixture.detectChanges()

    const textInput = fixture.debugElement.query(
      By.css('[data-testid="text-area"]')
    )
    await fixture.whenStable()
    expect(textInput.nativeElement.value).toBe(text)

    const infoWrapper = fixture.debugElement.query(
      By.css('[data-testid="info-wrapper"]')
    )
    const infoText = fixture.debugElement.query(
      By.css('[data-testid="info-text"]')
    )
    const textAreaCounter = fixture.debugElement.query(
      By.css('[data-testid="text-area-counter"]')
    )
    expect(infoWrapper).toBeFalsy()
    expect(infoText).toBeFalsy()
    expect(textAreaCounter).toBeFalsy()
  })

  it('should display correct label if no message', async () => {
    component.label = 'Text Label'
    component.message = undefined
    fixture.detectChanges()

    const textLabel = fixture.debugElement.query(
      By.css('[data-testid="text-area-label"]')
    )
    await fixture.whenStable()
    expect(textLabel.nativeElement.textContent.trim()).toContain('Text Label')
    expect(textLabel.nativeElement.textContent.trim()).not.toContain('Required')
  })

  it('should display correct label if required', async () => {
    component.label = 'Text Label'
    component.message = 'Required'
    fixture.detectChanges()

    const textLabel = fixture.debugElement.query(
      By.css('[data-testid="text-area-label"]')
    )
    await fixture.whenStable()
    expect(textLabel.nativeElement.textContent.trim()).toContain('Text Label')
    expect(textLabel.nativeElement.textContent.trim()).toContain('Required')
  })

  it('should disable the input', async () => {
    component.model = text
    component.isDisabled = true
    fixture.detectChanges()

    const textInput = fixture.debugElement.query(
      By.css('[data-testid="text-area"]')
    )
    await fixture.whenStable()
    expect(textInput.nativeElement.disabled).toBe(true)
  })

  it('should show max length and info text', async () => {
    component.maxLength = 100
    component.infoText = 'Info text'
    fixture.detectChanges()
    await fixture.whenStable()

    const assertiveText = fixture.debugElement.query(
      By.css('[data-testid="text-area-assertive-text"]')
    )
    expect(assertiveText.nativeElement.leftText).toBe(component.infoText)
    expect(assertiveText.nativeElement.rightText).toBe(
      `0 / ${component.maxLength}`
    )
  })
})
