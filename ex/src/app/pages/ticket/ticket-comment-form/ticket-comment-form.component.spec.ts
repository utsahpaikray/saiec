import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TicketCommentFormComponent } from './ticket-comment-form.component'
import { TranslocoService } from '@ngneat/transloco'
import { ServiceDeskLangCodes } from '@core/interfaces/service-desk-lang-codes.enum'
import { SimpleChange } from '@angular/core'

const mockForm = (component: TicketCommentFormComponent) => {
  component.form.controls['title'].setValue('test title')
  component.form.controls['message'].setValue('test message')
}

describe('TicketCommentFormComponent', () => {
  let component: TicketCommentFormComponent
  let fixture: ComponentFixture<TicketCommentFormComponent>
  let translocoService: TranslocoService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TicketCommentFormComponent,
        ReactiveFormsModule,
        getTranslocoModule()
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TicketCommentFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    translocoService = TestBed.inject(TranslocoService)
  })

  const expectedTranslatedText = (translationKey: string) => {
    return translocoService.translate(
      translationKey,
      {},
      component.serviceDeskLangCode
    )
  }

  it('initilize form correctly', () => {
    const form = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-form"]')
    )

    expect(form).toBeTruthy()
    expect(component.form.value).toEqual({
      title: '',
      message: ''
    })
  })

  it('should translate based on language code', () => {
    mockForm(component)
    component.serviceDeskLangCode = ServiceDeskLangCodes.EN
    fixture.detectChanges()

    const heading = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-heading"]')
    )
    const title = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-title"]')
    ).children[0]
    const message = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-message"]')
    ).children[0]
    const button = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-submit-button"]')
    )

    expect(heading.nativeElement.innerText.trim()).toEqual(
      expectedTranslatedText('General.NewMessage')
    )
    expect(title.nativeElement.innerText.trim()).toContain(
      expectedTranslatedText('General.Title')
    )
    expect(message.nativeElement.innerText.trim()).toEqual(
      expectedTranslatedText('General.Message')
    )
    expect(button.nativeElement.innerText.trim()).toEqual(
      expectedTranslatedText('General.SendMessage').toUpperCase()
    )
  })

  it('should send submit event on submit with valid form', () => {
    spyOn(component.submitEvent, 'emit').and.callThrough()

    mockForm(component)
    fixture.detectChanges()

    component.onSubmit()
    expect(component.form.valid).toBeTruthy()
    expect(component.submitEvent.emit).toHaveBeenCalled()
  })

  it('should not send submit event on submit and show error messages if invalid', () => {
    spyOn(component.submitEvent, 'emit').and.callThrough()

    component.form.markAllAsTouched()
    component.onSubmit()
    fixture.detectChanges()

    const titleError = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-title-error"]')
    )

    expect(component.form.valid).toBeFalsy()
    expect(titleError).toBeTruthy()
    expect(component.submitEvent.emit).not.toHaveBeenCalled()
  })

  it('should disable fields and button and show spinner when saving comment', () => {
    component.savingComment = true
    component.ngOnChanges({
      savingComment: {
        currentValue: true,
        firstChange: false,
        previousValue: undefined
      } as SimpleChange
    })
    fixture.detectChanges()

    const messageField = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-message"]')
    )
    const submitButton = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-submit-button"]')
    )
    const progressSpinner = fixture.debugElement.query(
      By.css('[data-testid="ticket-comment-saving-spinner"]')
    )
    expect(component.title.disabled).toBe(true)
    expect(messageField.parent?.nativeElement[0].disabled).toBeTruthy()
    expect(submitButton.nativeElement.disabled).toBeTruthy()
    expect(progressSpinner).toBeTruthy()
  })
})
