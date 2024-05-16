import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'

import { Alert } from './alert.model'
import { AlertComponent } from './alert.component'
import { DynamicLinkModule } from '../dynamic-link/dynamic-link.module'

describe('AlertComponent', () => {
  let component: AlertComponent
  let fixture: ComponentFixture<AlertComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [DynamicLinkModule, RouterTestingModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent)
    component = fixture.componentInstance
    component.alert = new Alert(
      'information',
      'A new software update is available. See what’s new in version 2.0.4.',
      '/my-link',
      'Link'
    )
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render alert with correct variant class', () => {
    const alert = fixture.debugElement.query(By.css('[data-testid="alert"]'))

    expect(alert.nativeElement.classList).toContain('bg-steelblue-50')
  })

  it(`should render correct variant's icon & class`, () => {
    const icon = fixture.debugElement.query(
      By.css('[data-testid="alert-icon"]')
    )
    expect(icon.nativeElement.classList).toContain('text-blue-700')
  })

  it('should render correct message & link', () => {
    const content = fixture.debugElement.query(
      By.css('[data-testid="alert-content"]')
    )
    const link = fixture.debugElement.query(
      By.css('[data-testid="alert-link"]')
    )

    expect(content.nativeElement.textContent).toContain(
      'A new software update is available. See what’s new in version 2.0.4.'
    )

    expect(link.nativeElement.getAttribute('ng-reflect-url')).toContain(
      '/my-link'
    )
    expect(link.nativeElement.textContent.trim()).toContain('Link')
  })

  it('should not render close button & icon if not dismissable', async () => {
    component.isDismissible = false

    fixture.detectChanges()
    await fixture.whenStable()

    const button = fixture.debugElement.query(
      By.css('[data-testid="alert-button"]')
    )
    const icon = fixture.debugElement.query(
      By.css('[data-testid="alert-button-icon"]')
    )

    expect(button).toBeFalsy()
    expect(icon).toBeFalsy()
  })

  it('should render close button & icon if dismissable', async () => {
    component.isDismissible = true

    fixture.detectChanges()
    await fixture.whenStable()

    const button = fixture.debugElement.query(
      By.css('[data-testid="alert-button"]')
    )
    const icon = fixture.debugElement.query(
      By.css('[data-testid="alert-button-icon"]')
    )

    expect(button).toBeTruthy()
    expect(icon).toBeTruthy()
  })
})
