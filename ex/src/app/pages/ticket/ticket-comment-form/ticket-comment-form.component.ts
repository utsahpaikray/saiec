import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { TicketCommentForm } from './ticket-comment-form.interface'
import { TextAreaModule } from '../../../components/text-area/text-area.module'
import { ProgressSpinnerModule } from '../../../components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { CommonModule } from '@angular/common'
import { ServiceDeskLangCodes } from '@core/interfaces/service-desk-lang-codes.enum'

@Component({
  selector: 'app-ticket-comment-form',
  templateUrl: './ticket-comment-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TextAreaModule,
    ProgressSpinnerModule,
    TranslocoRootModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketCommentFormComponent implements OnChanges {
  /**
   * Reset form
   */
  @Input() reset = false

  /**
   * Is saving comment
   */
  @Input() savingComment = false

  /**
   * Service desk language code
   */
  @Input() serviceDeskLangCode: ServiceDeskLangCodes

  /**
   * Submit button click event
   */
  @Output()
  submitEvent = new EventEmitter<{ title: string; message: string }>()
  private formBuilder = inject(FormBuilder)

  public hasMoreComments: boolean
  public commentsEndCursor: string | null
  public loadingMoreComments: boolean
  public titleReferenceMaxCount: number = 100

  public form: TicketCommentForm = this.formBuilder.nonNullable.group(
    {
      title: ['', [Validators.required]],
      message: ['']
    },
    { updateOn: 'submit' }
  )

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.savingComment.currentValue) {
      this.title.disable()
    }

    if (!changes.savingComment.currentValue && this.reset) {
      this.form.reset()
      this.title.enable()
    }
  }

  /**
   * Validate and save comment if valid
   */
  public onSubmit(): void {
    this.form.markAllAsTouched()
    if (!this.form.valid) return

    this.submitEvent.emit({
      title: this.form.controls.title.value,
      message: this.form.controls.message.value
    })
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(control: string): boolean {
    const input = this.form.get(control) as AbstractControl
    return input.invalid && input.touched
  }

  /**
   * Get title form control
   * @returns {FormControl<string>}
   */
  public get title(): FormControl<string> {
    return this.form.get('title') as FormControl<string>
  }
}
