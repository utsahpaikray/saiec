import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Toast } from './toast/toast.model'

import { ToasterComponent } from './toaster.component'
import { ToastComponent } from './toast/toast.component'
import { ToasterService } from './toaster.service'

describe('ToasterComponent', () => {
  let component: ToasterComponent
  let fixture: ComponentFixture<ToasterComponent>
  let service: ToasterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToasterComponent, ToastComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterComponent)
    component = fixture.componentInstance
    service = fixture.debugElement.injector.get(ToasterService)

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render correct amount of toasts', () => {
    const info = new Toast(
      'information',
      'A new software update is available. See what’s new in version 2.0.4.',
      '#',
      'Link'
    )
    const success = new Toast(
      'success',
      'There were 2 errors with your submission',
      '#',
      'Link'
    )

    service.addToast(info)
    service.addToast(success)
    fixture.detectChanges()
    const appToasts = fixture.debugElement.queryAll(By.css('app-toast'))

    expect(appToasts.length).toBe(2)
  })
})
