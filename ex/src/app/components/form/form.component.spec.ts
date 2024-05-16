import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

import { FormComponent } from './form.component'
import { TextAreaComponent } from '@components/text-area/text-area.component'

@Component({
  selector: 'app-form-wrapper',
  template: `<app-form [formGroup]="form">
    <div formGroupName="spareParts">
      <app-text-area
        name="shopId"
        formControlName="sparePartsShopId"
        label="Add the Shop Id"
        message="Required"
      >
        <span> Required field </span>
      </app-text-area>
    </div>
  </app-form>`
})
export class FormWrapperComponent {
  public form: FormGroup<{
    spareParts: FormGroup<{
      sparePartsShopId: FormControl<string>
    }>
  }>
}

describe('FormComponent', () => {
  let wrapper: FormWrapperComponent
  let component: FormComponent
  let fixture: ComponentFixture<FormWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, FormWrapperComponent, TextAreaComponent],
      imports: [FormsModule, ReactiveFormsModule, getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWrapperComponent)
    wrapper = fixture.componentInstance
    const formBuilder = new FormBuilder()
    wrapper.form = formBuilder.nonNullable.group({
      spareParts: formBuilder.nonNullable.group({
        sparePartsShopId: ['', [Validators.required]]
      })
    })
    component = fixture.debugElement.query(
      By.directive(FormComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should set submit button correctly', () => {
    component.submitText = 'Custom submit text'
    component.submitVariant = 'secondary'
    component.buttonDisabled = false

    const submitButton = fixture.debugElement.query(
      By.css('[data-testid="form-submit"]')
    )

    expect(submitButton.componentInstance.submitText).toEqual(
      'Custom submit text'
    )
    expect(submitButton.componentInstance.submitVariant).toEqual('secondary')
    expect(submitButton.componentInstance.buttonDisabled).toEqual(false)
  })

  it('should trigger submit event', () => {
    spyOn(component.submitEvent, 'emit').and.callThrough()
    const form = fixture.debugElement.query(By.css('form'))
    component.formGroup.get('spareParts')?.patchValue({
      sparePartsShopId: 'exampleShopId'
    })
    component.formGroup.updateValueAndValidity()
    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(component.submitEvent.emit).toHaveBeenCalled()
  })
})
