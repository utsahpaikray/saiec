import { HttpClientModule } from '@angular/common/http'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { ComponentsModule } from '@components/components.module'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ParticipantsComponent } from './participants.component'
import {
  ParticipantsGroup,
  RequestParticipantsGroup
} from '../../training-request-form.interface'

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent
  let fixture: ComponentFixture<ParticipantsComponent>
  const formBuilder: FormBuilder = new FormBuilder()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantsComponent],
      imports: [
        ReactiveFormsModule,
        getTranslocoModule(),
        ComponentsModule,
        AngularSvgIconModule.forRoot(),
        HttpClientModule
      ],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponent)
    component = fixture.componentInstance

    component.formGroup = formBuilder.nonNullable.group({
      participants: formBuilder.array<ParticipantsGroup>([]),
      participantLocation: ''
    })

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('check initial form values for participant form group', () => {
    const participantFormInitialValues = [
      { name: '', email: '' },
      { name: '', email: '' }
    ]
    expect(component.formGroup.value.participants).toEqual(
      participantFormInitialValues
    )
  })

  it('renders input elements for 2 participants', async () => {
    const firstParticipantFormNameElement = fixture.debugElement.query(
      By.css('[data-testid="participant-name-0"]')
    )
    const secondParticipantFormNameElement = fixture.debugElement.query(
      By.css('[data-testid="participant-name-1"]')
    )
    const firstParticipantFormEmailElement = fixture.debugElement.query(
      By.css('[data-testid="participant-email-0"]')
    )
    const secondParticipantFormEmailElement = fixture.debugElement.query(
      By.css('[data-testid="participant-email-1"]')
    )
    expect(firstParticipantFormNameElement).toBeTruthy()
    expect(secondParticipantFormNameElement).toBeTruthy()
    expect(firstParticipantFormEmailElement).toBeTruthy()
    expect(secondParticipantFormEmailElement).toBeTruthy()
  })

  it('adds participant', () => {
    component.addParticipant()
    fixture.detectChanges()

    const participantFormInitialValues = [
      { name: '', email: '' },
      { name: '', email: '' },
      { name: '', email: '' }
    ]
    expect(component.formGroup.value.participants).toEqual(
      participantFormInitialValues
    )
    const thirdParticipantFormNameElement = fixture.debugElement.query(
      By.css('[data-testid="participant-name-2"]')
    )
    const thirdParticipantFormEmailElement = fixture.debugElement.query(
      By.css('[data-testid="participant-email-2"]')
    )
    expect(thirdParticipantFormNameElement).toBeTruthy()
    expect(thirdParticipantFormEmailElement).toBeTruthy()
  })

  it('removes correct participant', () => {
    const secondParticipantName = component.participants.controls[1].get('name')
    secondParticipantName?.patchValue('testName')

    const secondParticipantEmail =
      component.participants.controls[1].get('email')
    secondParticipantEmail?.patchValue('test@email.com')

    component.removeParticipant(1)
    fixture.detectChanges()

    const expectedParticipantFormValue = [{ name: '', email: '' }]
    expect(component.formGroup.value.participants).toEqual(
      expectedParticipantFormValue
    )
    const secondParticipantFormNameElement = fixture.debugElement.query(
      By.css('[data-testid="participant-name-1"]')
    )
    expect(secondParticipantFormNameElement).toBeFalsy()
  })

  it('should validate email address and show error message', () => {
    const firstParticipantEmail =
      component.participants.controls[0].get('email')
    firstParticipantEmail?.patchValue('test')
    expect(component.participants.status).toBe('INVALID')
    expect(firstParticipantEmail?.value).toBe('test')
    expect(firstParticipantEmail?.errors?.email).toBeTruthy()
    firstParticipantEmail?.patchValue('test@email.com')
    expect(firstParticipantEmail?.errors).toBeNull()
  })
})
