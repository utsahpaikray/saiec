import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { DropdownItem } from './dropdown-item.model'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownComponent)
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor, OnChanges {
  /**
   * Dropdown name
   */
  @Input()
  name: string = ''

  /**
   * Label text
   */
  @Input()
  label?: string = ''

  /**
   * Validation Message to show above dropdown
   */
  @Input()
  message?: string

  /**
   * Text to show as selected value.
   * This can be used to overrule the label of the selected
   * dropdown item, which is shown by default
   */
  @Input()
  text?: string

  /**
   * Should the selected text be shown?
   */
  @Input()
  showText = true

  /**
   * Input placeholder
   */
  @Input()
  placeholder?: string

  /**
   * Dropdown icon
   */
  @Input()
  icon?: string

  /**
   * Is dropdown menu large. Sets a wider min-width
   */
  @Input()
  isLarge? = false

  /**
   * Is dropdown disabled
   */
  @Input()
  isDisabled?: boolean = false

  /**
   * Is form element styling
   */
  @Input()
  isSelect?: boolean = false

  /**
   * Is dropdown menu open
   */
  @Input()
  isOpen = false

  /**
   * Has dropdown a max of 2 text lines
   */
  @Input()
  hasMaxTwoTextLines = false

  /**
   * Dropdown items
   */
  @Input()
  items?: DropdownItem[]

  /**
   * Info text
   */
  @Input()
  infoText?: string

  /**
   * change handler
   */
  @Output()
  changeEvent = new EventEmitter<string>()

  public value: string
  public selectedItem?: DropdownItem | null

  /**
   * Required fields for Angular form validation
   */
  private onChange = (value: string) => {}
  private onTouched = () => {}

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event'])
  toggleOpen(event: Event) {
    if (this.isOpen && !this.element.nativeElement.contains(event.target)) {
      this.isOpen = false
      this.onTouched()
    }
  }

  /**
   * Set selected item if items change
   * @param {SimpleChanges} changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.setSelectedItem(this.value)
    }
  }

  /**
   * The writeValue method is called by the Angular forms module
   * whenever the parent form wants to set a value in the child control.
   * @param {string} value
   */
  public writeValue(value: string) {
    this.value = value
    this.setSelectedItem(value)
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
   * Set disabled state
   */
  public setDisabledState(disabled: boolean) {
    this.isDisabled = disabled
  }

  /**
   * On item select emit value
   * @param {Event} event
   * @param {string} value
   */
  public selectItem(event: Event, value: string): void {
    event.stopPropagation()
    this.isOpen = false
    this.value = value
    this.onChange(value)
    this.onTouched()
    this.setSelectedItem(value)
    this.changeEvent.emit(value)
  }

  /**
   * Set selected item
   * @param {string} value
   */
  private setSelectedItem(value: string): void {
    if (!this.items) {
      this.selectedItem = null
      return
    }

    this.selectedItem = this.items.find(
      (item: DropdownItem) => item.value === value
    )
  }
}
