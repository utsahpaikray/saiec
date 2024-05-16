import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TOAST_DATA, TOAST_REF, ToastRef } from '../toasts.service'
import { ToastComponent, ToastType } from './toast.component'

const mockToastData1 = {
  messageKey: 'Test message',
  type: ToastType.Success
}

const mockToastData2 = {
  messageKey: 'Test message 2',
  type: ToastType.Warning
}

describe('ToastComponent', () => {
  let component: ToastComponent
  let fixture: ComponentFixture<ToastComponent>
  let toastRef: jest.Mocked<ToastRef>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, getTranslocoModule()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: TOAST_REF,
          useValue: {
            close: jest.fn()
          }
        },
        {
          provide: TOAST_DATA,
          useValue: mockToastData1
        }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent)
    component = fixture.componentInstance

    toastRef = TestBed.inject(TOAST_REF) as jest.Mocked<ToastRef>
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the message', () => {
    const message = fixture.debugElement.query(
      By.css('[data-testid="toast-message"]')
    )
    expect(message.nativeElement.textContent).toBeTruthy()

    expect(message.nativeElement.textContent.trim()).toBe(
      mockToastData1.messageKey
    )
  })

  it('should not render a success icon if warning is provided', () => {
    component.toastData = mockToastData2
    fixture.detectChanges()
    const successIcon = fixture.debugElement.query(By.css('[key="success"]'))
    expect(successIcon).toBeFalsy()
  })

  it('should render the correct success icon color', () => {
    const successIcon = fixture.debugElement.query(By.css('[key="success"]'))
      .nativeElement as HTMLElement
    fixture.detectChanges()
    expect(successIcon).toBeTruthy()

    const successIconColor = 'color: var(--global-palette-success-400);'
    expect(successIcon.getAttribute('style')).toBe(successIconColor)
  })

  it('should show warning icon for warning type', () => {
    component.toastData = mockToastData2
    fixture.detectChanges()
    const warningIcon = fixture.nativeElement.querySelector('[key="warning"]')
    expect(warningIcon).toBeTruthy()
  })

  it('should render the correct warning icon color', () => {
    component.toastData = mockToastData2
    fixture.detectChanges()
    const warningIcon = fixture.debugElement.query(By.css('[key="warning"]'))
      .nativeElement as HTMLElement

    expect(warningIcon).toBeTruthy()

    const warningIconColor = 'color: var(--global-palette-warning-400);'
    expect(warningIcon.getAttribute('style')).toBe(warningIconColor)
  })

  it('should close the toast when action button is clicked', () => {
    const spyClose = jest.spyOn(toastRef, 'close')
    const actionButton = fixture.nativeElement.querySelector('button')
    actionButton.click()
    expect(spyClose).toHaveBeenCalled()
  })
})
