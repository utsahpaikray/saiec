import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ProgressSpinnerComponent } from './progress-spinner.component'

@Component({
  selector: 'app-progress-spinner-wrapper',
  template: `<app-progress-spinner>Processing...</app-progress-spinner>`
})
export class ProgressSpinnerWrapperComponent {}

describe('ProgressSpinnerComponent', () => {
  let wrapper: ProgressSpinnerWrapperComponent
  let component: ProgressSpinnerComponent
  let fixture: ComponentFixture<ProgressSpinnerWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressSpinnerComponent, ProgressSpinnerWrapperComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(ProgressSpinnerComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have the spinner with label', () => {
    const spinner = fixture.debugElement.query(
      By.css('[data-testid="progress-spinner"]')
    )
    const label = fixture.debugElement.query(
      By.css('[data-testid="progress-spinner-label"]')
    )

    expect(spinner).toBeTruthy()
    expect(label).toBeTruthy()
  })

  it('should set correct size class', () => {
    component.size = 'xs'
    fixture.detectChanges()

    const progressSpinner = fixture.debugElement.query(
      By.css('[data-testid="progress-spinner"]')
    )

    expect(progressSpinner.nativeElement.classList.contains('text-xs')).toEqual(
      true
    )
  })
})
