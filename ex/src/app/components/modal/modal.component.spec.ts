import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ModalComponent } from './modal.component'

import { WindowScrollService } from '@core/window-scroll/window-scroll.service'

describe('ModalComponent', () => {
  let component: ModalComponent
  let fixture: ComponentFixture<ModalComponent>
  let windowScrollService: WindowScrollService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {
          provide: WindowScrollService,
          useClass: WindowScrollService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    windowScrollService = TestBed.inject(WindowScrollService)
    component.id = 'modal-1'
    component.ngOnInit()
  })

  it('shows title', async () => {
    component.title = 'Add user'

    fixture.detectChanges()
    await fixture.whenStable()
    const modalTitle = fixture.debugElement.query(
      By.css('[data-testid="modal-title"]')
    )

    expect(modalTitle.nativeElement.textContent.trim()).toContain('Add user')
  })

  it('should be closed by default', () => {
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    )

    expect(overlay.nativeElement.classList.contains('opacity-0')).toEqual(true)
    expect(overlay.nativeElement.classList.contains('invisible')).toEqual(true)
    expect(overlay.nativeElement.classList.contains('opacity-100')).toEqual(
      false
    )
    expect(overlay.nativeElement.classList.contains('visible')).toEqual(false)
  })

  it('should open', async () => {
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    )

    component.open()
    fixture.detectChanges()
    await fixture.whenStable()

    expect(overlay.nativeElement.classList.contains('!opacity-100')).toEqual(
      true
    )
    expect(overlay.nativeElement.classList.contains('!visible')).toEqual(true)
  })

  it('should close when clicking on the close button', async () => {
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    )
    const closeButton = fixture.debugElement.query(
      By.css('[data-testid="close-button"]')
    )

    component.open()
    fixture.detectChanges()
    await fixture.whenStable()

    closeButton.triggerEventHandler('click', {
      target: closeButton.nativeElement
    })
    fixture.detectChanges()
    await fixture.whenStable()

    expect(overlay.nativeElement.classList.contains('opacity-0')).toEqual(true)
    expect(overlay.nativeElement.classList.contains('invisible')).toEqual(true)
    expect(overlay.nativeElement.classList.contains('!opacity-100')).toEqual(
      false
    )
    expect(overlay.nativeElement.classList.contains('!visible')).toEqual(false)
  })

  it('should close when clicking on the overlay', async () => {
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    )

    component.open()
    fixture.detectChanges()
    await fixture.whenStable()

    overlay.triggerEventHandler('click', {
      target: overlay.nativeElement
    })
    fixture.detectChanges()
    await fixture.whenStable()

    expect(overlay.nativeElement.classList.contains('opacity-0')).toEqual(true)
    expect(overlay.nativeElement.classList.contains('invisible')).toEqual(true)
    expect(overlay.nativeElement.classList.contains('!opacity-100')).toEqual(
      false
    )
    expect(overlay.nativeElement.classList.contains('!visible')).toEqual(false)
  })

  it('should not close when clicking on the modal', async () => {
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    )
    const modal = fixture.debugElement.query(By.css('[data-testid="modal"]'))

    component.open()
    fixture.detectChanges()
    await fixture.whenStable()

    modal.triggerEventHandler('click', {
      target: modal.nativeElement
    })
    fixture.detectChanges()
    await fixture.whenStable()

    expect(overlay.nativeElement.classList.contains('!opacity-100')).toEqual(
      true
    )
    expect(overlay.nativeElement.classList.contains('!visible')).toEqual(true)
  })
})
