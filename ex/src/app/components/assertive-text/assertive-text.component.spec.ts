import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { AssertiveTextComponent } from './assertive-text.component'

describe('AssertiveTextComponent', () => {
  let component: AssertiveTextComponent
  let fixture: ComponentFixture<AssertiveTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssertiveTextComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AssertiveTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should show left text and right text', () => {
    component.leftText = 'left assertive text'
    component.rightText = 'right assertive text'
    fixture.detectChanges()

    const assertiveTextWrapper = fixture.debugElement.query(
      By.css('[data-testid="assertive-text-wrapper"]')
    )
    const leftText = fixture.debugElement.query(
      By.css('[data-testid="left-text"]')
    )
    const rightText = fixture.debugElement.query(
      By.css('[data-testid="right-text"]')
    )
    expect(assertiveTextWrapper).toBeTruthy()
    expect(leftText).toBeTruthy()
    expect(rightText).toBeTruthy()
  })

  it('should not show assertive text', () => {
    const assertiveTextWrapper = fixture.debugElement.query(
      By.css('[data-testid="assertive-text-wrapper"]')
    )
    const leftText = fixture.debugElement.query(
      By.css('[data-testid="left-text"]')
    )
    const rightText = fixture.debugElement.query(
      By.css('[data-testid="right-text"]')
    )
    expect(assertiveTextWrapper).toBeFalsy()
    expect(leftText).toBeFalsy()
    expect(rightText).toBeFalsy()
  })

  it('should get correct styling for right text when no left text exists', () => {
    component.rightText = 'right assertive text'
    fixture.detectChanges()

    const rightText = fixture.debugElement.query(
      By.css('[data-testid="right-text"]')
    )
    expect(rightText.nativeElement.classList.contains('d-flex')).toEqual(true)
    expect(
      rightText.nativeElement.classList.contains('justify-flex-end')
    ).toEqual(true)
  })

  it('should get correct styling for wrapper when both texts exist', () => {
    component.leftText = 'left assertive text'
    component.rightText = 'right assertive text'
    fixture.detectChanges()

    const assertiveTextWrapper = fixture.debugElement.query(
      By.css('[data-testid="assertive-text-wrapper"]')
    )
    expect(
      assertiveTextWrapper.nativeElement.classList.contains('d-flex')
    ).toEqual(true)
    expect(
      assertiveTextWrapper.nativeElement.classList.contains(
        'justify-space-between'
      )
    ).toEqual(true)
    expect(
      assertiveTextWrapper.nativeElement.classList.contains('gap-s')
    ).toEqual(true)
  })
})
