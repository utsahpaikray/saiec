import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core'
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  takeUntil
} from 'rxjs'

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input') inputRef: ElementRef

  /**
   * Search text
   */
  @Input()
  searchText?: string = ''

  /**
   * Delay of change event
   */
  @Input()
  delay = 0

  /**
   * Info text
   */
  @Input()
  infoText?: string

  /**
   * Placeholder text
   */
  @Input()
  placeholder?: string = ''

  /**
   * change handler
   */
  @Output()
  changeEvent = new EventEmitter<string>()

  public focussed = false

  /**
   * Timeout on blur is needed because otherwise if user clicked the clear button,
   * Blur will happen before the click event. Meaning the button is hidden before
   * it can register the click event, and the clear will not work.
   */
  private blurTimeout: ReturnType<typeof setTimeout>
  private unsubscribe$: Subject<void> = new Subject<void>()

  /**
   * Bind focus, blur and input event on input element
   */
  public ngAfterViewInit(): void {
    this.inputRef.nativeElement.addEventListener(
      'focus',
      this.onFocus.bind(this)
    )
    this.inputRef.nativeElement.addEventListener('blur', this.onBlur.bind(this))
    this.watchInputChange()
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Bind to input of input field.
   */
  public watchInputChange(): void {
    fromEvent(this.inputRef.nativeElement, 'input')
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(this.delay),
        distinctUntilChanged()
      )
      .subscribe({
        next: () => this.changeEvent.emit(this.searchText)
      })
  }

  /**
   * Clear search text and emit new value
   * Refocus the input
   */
  public clearSearch(): void {
    this.searchText = ''
    this.changeEvent.emit(this.searchText)

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout)
    }
    this.inputRef.nativeElement.focus()
  }

  /**
   * Set focused state
   */
  public onFocus(): void {
    this.focussed = true
  }

  /**
   * On blur set timeout to remove focussed state
   */
  public onBlur(): void {
    this.blurTimeout = setTimeout(() => {
      this.focussed = false
    }, 500)
  }
}
