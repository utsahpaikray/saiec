import { NO_ERRORS_SCHEMA } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { Toast } from './toast.model'
import { ToastComponent } from './toast.component'
import { ToasterService } from '../toaster.service'

describe('ToastComponent', () => {
  let component: ToastComponent
  let fixture: ComponentFixture<ToastComponent>
  let service: ToasterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent)
    component = fixture.componentInstance
    service = fixture.debugElement.injector.get(ToasterService)
    component.toast = new Toast(
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

  it('should render toast', () => {
    const toast = fixture.debugElement.query(
      By.css('[data-testid="toast-information"]')
    )

    expect(toast.nativeElement.classList).toContain('d-block')
  })

  it(`should remove toast`, fakeAsync(() => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="toast-information"]')
    )

    const componentSpy = spyOn(component, 'remove').and.callThrough()
    const serviceSpy = spyOn(service, 'removeToast').and.callThrough()

    expect(componentSpy).toHaveBeenCalledTimes(0)
    expect(serviceSpy).toHaveBeenCalledTimes(0)

    button.triggerEventHandler('remove', null)
    // we need to wait 300ms because of the setTimeout in the remove() method
    tick(300)

    expect(componentSpy).toHaveBeenCalledTimes(1)
    expect(component.isVisible).toBeFalsy()
    expect(serviceSpy).toHaveBeenCalledTimes(1)
  }))
})
