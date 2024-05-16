import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { ButtonVariant, ButtonSize } from '@core/types/button'
import { FormGroupDirective, FormGroup } from '@angular/forms'
import { breakpointMdMin } from 'src/tokens/build/js/es6'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  private breakpointMd = parseInt(breakpointMdMin, 10)

  /**
   * Submit button text
   */
  @Input()
  submitText: string = this.translocoService.translate('General.Save')

  /**
   * Submit button variant
   */
  @Input()
  submitVariant: ButtonVariant = 'primary'

  /**
   * Submit button size
   */
  @Input()
  buttonsSize: ButtonSize = 'base'

  /**
   * Submit button disabled
   */
  @Input()
  buttonDisabled: boolean = false

  /**
   * Submit handler
   */
  @Output()
  submitEvent = new EventEmitter<void>()

  constructor(
    private rootFormGroup: FormGroupDirective,
    private translocoService: TranslocoService,
    private el: ElementRef
  ) {}

  /**
   * On form submit
   */
  public onSubmit(): void {
    this.formGroup.markAllAsTouched()
    this.submitEvent.emit()

    // setTimeout is here to ensure that all form is validated before trying to get invalid controls
    setTimeout(() => {
      this.scrollToInvalidControl()
    })
  }

  scrollToInvalidControl() {
    const firstInvalidControl =
      this.el.nativeElement.querySelector('form .ng-invalid')

    if (!firstInvalidControl) return

    const headerOffset = window.innerWidth >= this.breakpointMd ? 120 : 70

    const scrollTopPosition =
      firstInvalidControl.getBoundingClientRect().top +
      window.scrollY -
      headerOffset

    window.scroll({
      behavior: 'smooth',
      top: scrollTopPosition
    })
  }

  /**
   * Get correct formgroup
   */
  public get formGroup(): FormGroup {
    return this.rootFormGroup.form as FormGroup
  }
}
