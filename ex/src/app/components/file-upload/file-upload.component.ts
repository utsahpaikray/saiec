import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { ButtonVariant } from '@core/types/button'
import { fromEvent, Subject, takeUntil } from 'rxjs'
import { Alert } from '../alert/alert.model'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @ViewChild('upload') uploadRef: ElementRef

  /**
   * Button label
   */
  @Input()
  label: string

  /**
   * Button label
   */
  @Input()
  buttonLabel: string

  /**
   * Button position
   */
  @Input()
  buttonPosition: 'left' | 'right' = 'right'

  /**
   * Button variant
   */
  @Input()
  buttonVariant: ButtonVariant = 'secondary'

  /**
   * Show alert or not
   */
  @Input()
  showAlert: boolean = false

  /**
   * Show alert message
   */
  @Input()
  alertMessage?: string

  /**
   * Multiple or single upload.
   * Defaults to true
   */
  @Input()
  multiple: boolean = true

  /**
   * Files types that can be uploaded.
   * For all examples see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
   */
  @Input()
  accept: string = '*'

  /**
   * Change event
   */
  @Output()
  changeEvent = new EventEmitter<File[]>()

  @Input()
  public files: File[] = []

  private unsubscribe$: Subject<void> = new Subject<void>()
  public alert: Alert | null

  /**
   * Bind to input change after view init
   */
  public ngAfterViewInit(): void {
    fromEvent(this.uploadRef.nativeElement, 'change')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((event: any) => {
        const files = Array.from(event.target.files) as File[]
        files.forEach((file: File) => this.files.push(file))
        this.uploadRef.nativeElement.value = ''
        this.changeEvent.emit(this.files)
      })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.showAlert?.currentValue || changes.alertMessage?.currentValue) {
      this.showFileAlert()
    } else {
      this.alert = null
    }
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * On button click trigger input click to initiate upload
   */
  public uploadFile(event: Event): void {
    event.preventDefault()
    this.uploadRef.nativeElement.click()
  }

  /**
   * Remove files from list
   * @param {number} index
   */
  public removeFile(event: Event, index: number): void {
    event.stopPropagation()
    this.files.splice(index, 1)
    this.changeEvent.emit(this.files)
  }

  /**
   * Show missing files alert
   */
  private showFileAlert(): void {
    if (!this.showAlert || !this.alertMessage) return
    this.alert = new Alert('error', this.alertMessage)
  }
}
