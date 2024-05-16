import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ModalService } from '../modal/modal.service'
import { ConfirmationModalComponent } from './confirmation-modal.component'

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent
  let fixture: ComponentFixture<ConfirmationModalComponent>
  let modalService: ModalService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [ConfirmationModalComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    modalService = TestBed.inject(ModalService)
    component.id = 'test-confrimation-modal'
  })

  it('cancels the modal correctly', () => {
    spyOn(component.closeEvent, 'emit').and.callThrough()
    spyOn(modalService, 'close').and.callThrough()

    component.cancel(true)
    expect(component.closeEvent.emit).toHaveBeenCalledOnceWith(false)
    expect(modalService.close).toHaveBeenCalledOnceWith(
      'test-confrimation-modal'
    )
  })

  it('confirms the modal correctly', () => {
    spyOn(component.closeEvent, 'emit').and.callThrough()
    spyOn(modalService, 'close').and.callThrough()

    component.confirm()

    expect(component.closeEvent.emit).toHaveBeenCalledOnceWith(true)
    expect(modalService.close).toHaveBeenCalledOnceWith(
      'test-confrimation-modal'
    )
  })

  it('show cancel button', () => {
    const cancelButton = fixture.debugElement.query(
      By.css('[data-testid="confirmation-modal-cancel-button"]')
    )
    expect(cancelButton).toBeTruthy()
  })

  it('does not show cancel button', async () => {
    component.showCancelButton = false
    fixture.detectChanges()
    await fixture.whenStable()

    const cancelButton = fixture.debugElement.query(
      By.css('[data-testid="confirmation-modal-cancel-button"]')
    )
    expect(cancelButton).toBeFalsy()
  })
})
