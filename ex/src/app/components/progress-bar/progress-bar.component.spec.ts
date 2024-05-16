import { NO_ERRORS_SCHEMA } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ProgressBarComponent } from './progress-bar.component'

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent
  let fixture: ComponentFixture<ProgressBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show correct progress value as label', async () => {
    component.progress = 20
    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.progress).toEqual(20)
    const label = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-label"]')
    )
    expect(label.nativeElement.innerText.trim()).toBe('20%')
  })

  it('should show correct width value as progress value', async () => {
    component.progress = 50
    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.progress).toEqual(50)
    const progressBar = fixture.debugElement.query(
      By.css('[data-testid="progress-bar"]')
    )
    expect(progressBar.styles.width).toBe('50%')
  })

  it('cancel event', fakeAsync(() => {
    spyOn(component.cancel, 'emit')
    const cancelButton = fixture.debugElement.query(
      By.css('[data-testid="cancel-button"]')
    )
    cancelButton.triggerEventHandler('click', null)
    tick()

    expect(component.cancel.emit).toHaveBeenCalled()
  }))

  it('should show completed template when progress is 100', async () => {
    component.progress = 100
    fixture.detectChanges()
    await fixture.whenStable()

    const progressBarWrapper = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-wrapper"]')
    )
    const completedTemplate = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-completed"]')
    )
    expect(progressBarWrapper).toBeFalsy()
    expect(completedTemplate).toBeTruthy()
  })

  it('should show progress bar when progress is less than 100', async () => {
    component.progress = 20
    fixture.detectChanges()
    await fixture.whenStable()

    const progressBarWrapper = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-wrapper"]')
    )
    const completedTemplate = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-completed"]')
    )
    expect(progressBarWrapper).toBeTruthy()
    expect(completedTemplate).toBeFalsy()
  })

  it('should mock window inner width and show text on tablet & desktop', async () => {
    const spyOnResize = spyOnProperty(window, 'innerWidth').and.returnValue(768)
    window.dispatchEvent(new Event('resize'))
    fixture.detectChanges()
    await fixture.whenStable()
    expect(spyOnResize).toHaveBeenCalled()

    const text = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-text"]')
    )
    expect(text).toBeTruthy()
  })

  it('should mock window inner width and not show text on mobile', async () => {
    const spyOnResize = spyOnProperty(window, 'innerWidth').and.returnValue(767)
    window.dispatchEvent(new Event('resize'))
    fixture.detectChanges()
    await fixture.whenStable()
    expect(spyOnResize).toHaveBeenCalled()

    const text = fixture.debugElement.query(
      By.css('[data-testid="progress-bar-text"]')
    )
    expect(text).toBeFalsy()
  })
})
