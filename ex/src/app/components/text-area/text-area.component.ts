import { Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextAreaComponent)
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {
  /**
   * Text area name
   */
  @Input()
  name: string = ''

  /**
   * Amount of rows
   */
  @Input()
  rows: number = 5

  /**
   * Amount of cols
   */
  @Input()
  cols: number = 50

  /**
   * Placeholder text
   */
  @Input()
  placeholder?: string = ''

  /**
   * Input Label text
   */
  @Input()
  label?: string = ''

  /**
   * Info text
   */
  @Input()
  infoText?: string

  /**
   * Max Length of text area
   */
  @Input()
  maxLength?: number

  /**
   * Is area disabled?
   */
  @Input()
  isDisabled = false

  /**
   * Validation Message to show above text area
   */
  @Input()
  message?: string

  /**
   * Required fields for Angular form validation
   */
  public model: any
  public onChange = (value: string) => {}
  public onTouched = () => {}

  /**
   * The writeValue method is called by the Angular forms module
   * whenever the parent form wants to set a value in the child control.
   * @param {string} value
   */
  public writeValue(value: string) {
    this.model = value
  }

  /**
   * If the user interacts with the form control,
   * then the new value needs to be communicated back to the parent form
   * This happens through the onChange callback
   * @param {any} onChange
   */
  public registerOnChange(onChange: any) {
    this.onChange = onChange
  }

  /**
   * Besides reporting new values back to the parent form,
   * we also need to inform the parent form when the child control
   * has been considered to be touched by the user.
   * @param {any} onTouched
   */
  public registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  /**
   * Trigger change handler and set as touched
   * @param {string} value
   */
  public valueChange(value: any) {
    this.onChange(value)
    this.onTouched()
  }

  /**
   * Set disabled state
   */
  public setDisabledState(disabled: boolean) {
    this.isDisabled = disabled
  }

  /**
   * Shows the current number of characters in relation
   * to the maxLength
   */
  public showCharacterCount(): string {
    if (!this.maxLength) return ''
    return `${this.model?.length || 0} / ${this.maxLength}`
  }
}
