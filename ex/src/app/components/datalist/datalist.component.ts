import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subject } from 'rxjs'

import { DatalistItem } from './datalist-item.model'

@Component({
  selector: 'app-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatalistComponent)
    }
  ]
})
export class DatalistComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy
{
  /**
   * Input reference
   */
  @ViewChild('input') inputRef: ElementRef

  /**
   * List box reference
   */
  @ViewChild('listBox') listBoxRef!: ElementRef

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
   * Info text
   */
  @Input()
  infoText?: string

  /**
   * Placeholder text
   */
  @Input()
  placeholder?: string

  /**
   * Is datalist disabled?
   */
  @Input()
  isDisabled = false

  /**
   * Array of data objects to show in the list
   */
  @Input()
  items: DatalistItem[]

  /**
   * Change handler
   */
  @Output()
  changeEvent = new EventEmitter<DatalistItem | null | undefined>()

  public isOpen: ConstrainBoolean
  public top: boolean
  public bottom = true
  public focused: boolean
  public filteredItems: DatalistItem[]
  public filterValue: string
  public value: string | null
  public selectedItem?: DatalistItem | null

  /**
   * Timeout on blur is needed because otherwise if user clicked the clear button,
   * Blur will happen before the click event. Meaning the button is hidden before
   * it can register the click event, and the clear will not work.
   */
  private blurTimeout: ReturnType<typeof setTimeout>

  /**
   * Required fields for Angular form validation
   */
  private onChange = (value: string | null) => {
    // do nothing
  }
  private onTouched = () => {
    //do nothing
  }

  private removeEventListener: () => void
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  /**
   * Bind focus, blur and input event on input element
   * and set list box position
   */
  ngAfterViewInit(): void {
    this.inputRef.nativeElement.addEventListener(
      'focus',
      this.onFocus.bind(this)
    )
    this.inputRef.nativeElement.addEventListener('blur', this.onBlur.bind(this))
    this.setListBoxPosition()
    this.cd.detectChanges()
  }

  /**
   * On change filter items correctly
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.setSelectedItem()
      this.setListBoxPosition()
    }
  }

  /**
   * Remove event listener and
   * clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    if (this.removeEventListener) {
      this.removeEventListener()
    }

    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * The writeValue method is called by the Angular forms module
   * whenever the parent form wants to set a value in the child control.
   * @param {string} value
   */
  public writeValue(value: string) {
    this.value = value
    this.setSelectedItem()
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
   * On focus sets focused state
   */
  public onFocus(): void {
    this.focused = true
  }

  /**
   * On blur sets timeout to remove focused state
   */
  public onBlur(): void {
    this.blurTimeout = setTimeout(() => {
      this.focused = false
    }, 500)
  }

  /**
   * Clear search text, updates value with input logic
   * and refocus it
   * @param {MouseEvent} event
   */
  public clearFilter(event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()

    this.filterValue = ''
    this.onInput(event)

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout)
    }
    this.inputRef.nativeElement.focus()
  }

  /**
   * Set disabled state
   * @param {boolean} disabled
   */
  public setDisabledState(disabled: boolean) {
    this.isDisabled = disabled
  }

  /**
   * Select item and emit selected item
   * @param {DatalistItem} item
   */
  public selectItem(value: string): void {
    this.value = value
    this.isOpen = false
    this.setSelectedItem()
    this.onChange(value)
    this.onTouched()
    this.changeEvent.emit(this.selectedItem)
  }

  /**
   * On input typing open field if not yet open.
   * Trigger change event
   * @param {MouseEvent} event
   * @param {string} filterValue
   */
  public onInput(event: MouseEvent): void {
    const target = event.target as HTMLInputElement

    if (!this.isOpen) this.toggleDataList(event, true)

    this.selectedItem = this.getItemFromLabel(target.value)
    this.value = this.selectedItem?.value || null
    this.filterItems(target.value)
    this.onChange(this.value)
    this.changeEvent.emit(this.selectedItem)
  }

  /**
   * Filter items that contain filtered value string
   * @param {string} filterValue
   */
  public filterItems(filterValue: string): void {
    if (!this.items || this.items.length === 0) return

    this.filteredItems = this.items.filter(
      (item) =>
        item.label.toLowerCase().indexOf((filterValue || '').toLowerCase()) > -1
    )
  }

  /**
   * Set listbox position (top or bottom)
   */
  private setListBoxPosition(): void {
    const bodyHeight = document.body.clientHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const listBoxEl = this.listBoxRef?.nativeElement
    const datalistHeight = Math.round(
      listBoxEl?.getBoundingClientRect().top +
        listBoxEl?.getBoundingClientRect().height
    )

    this.top = datalistHeight + scrollTop >= bodyHeight
    this.bottom = !this.top
  }

  /**
   * Toggle data list if not yet open
   * @param {MouseEvent} event
   * @param {boolean} isOpen
   */
  public toggleDataList(event: MouseEvent, isOpen: boolean): void {
    const element = event.target as HTMLElement

    if (this.isDisabled || element.getAttribute('key') === 'cross') return

    this.isOpen = isOpen

    if (!this.isOpen && this.removeEventListener) {
      this.removeEventListener()
      return
    }

    this.bindClickOutsideListener()
  }

  /**
   * Set selected item
   */
  private setSelectedItem(): void {
    if (!this.items) {
      this.selectedItem = null
      return
    }

    this.selectedItem = this.getItemFromValue(this.value)
    this.filterValue = this.text
      ? this.text
      : this.selectedItem?.label || this.filterValue
    this.filterItems(this.filterValue)
  }

  /**
   * Add click outside listener
   */
  private bindClickOutsideListener(): void {
    this.removeEventListener = this.renderer.listen(
      'document',
      'click',
      (event) => {
        if (!this.element.nativeElement.contains(event.target)) {
          this.isOpen = false
          this.onTouched()
          this.removeEventListener()
        }
      }
    )
  }

  /**
   * Check items for match by DataListItem.label
   * @param {string} label
   * @returns {DatalistItem | null}
   */
  private getItemFromLabel(label: string): DatalistItem | null {
    return (
      this.items?.find((item: DatalistItem) => item.label === label) || null
    )
  }

  /**
   * Check items for match by DataListItem.value
   * @param {string | null} value
   * @returns {DatalistItem | null}
   */
  private getItemFromValue(value: string | null): DatalistItem | null {
    return (
      this.items?.find((item: DatalistItem) => item.value === value) || null
    )
  }
}
