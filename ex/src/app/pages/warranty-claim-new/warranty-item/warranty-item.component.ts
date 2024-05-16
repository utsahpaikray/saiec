import { CommonModule } from '@angular/common'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { FormModule } from '@components/form/form.module'
import { ModalService } from '@components/modal/modal.service'
import { TextAreaModule } from '@components/text-area/text-area.module'
import { Asset, DocumentInput } from '@core/generated/types'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { NumericDecimalOnlyDirective } from '@core/validators/numeric-decimal-only.directive'
import { AddAttachmentModalComponent } from '@features/add-attachment-modal/add-attachment-modal.component'
import { AttachmentListComponent } from '@features/attachment-list/attachment-list.component'
import { DocumentInputType } from '@features/attachment-list/attachment-list.interface'
import { v4 as uuidv4 } from 'uuid'
import {
  AttachmentFormGroup,
  WarrantyItemGroup
} from '../warranty-create-form.interface'
import { AssetSelectorComponent } from './asset-selector/asset-selector.component'
import { ItemSelectorComponent } from './item-selector/item-selector.component'
import { WarrantyItemTableComponent } from './warranty-item-table/warranty-item-table.component'

@Component({
  selector: 'app-warranty-item',
  templateUrl: './warranty-item.component.html',
  styleUrls: ['./warranty-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslocoRootModule,
    ReactiveFormsModule,
    FormModule,
    AssetSelectorComponent,
    ItemSelectorComponent,
    NumericDecimalOnlyDirective,
    TextAreaModule,
    AddAttachmentModalComponent,
    AttachmentListComponent,
    WarrantyItemTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WarrantyItemComponent),
      multi: true
    }
  ]
})
export class WarrantyItemComponent implements ControlValueAccessor, OnInit {
  @Input() index = 0

  @Input() isAnyWarrantyItemsOnEdit = false

  @Output()
  remove = new EventEmitter<number>()

  @Output()
  editEvent = new EventEmitter<{ index: number; isEdit: boolean }>()

  public itemQuantityMaxCount = 17
  public serialNumberMaxCount = 100
  public warrantyReasonMaxCount = 255
  public documents: DocumentInputType[] = []
  public isEdit = false

  private formBuilder = inject(FormBuilder)
  private modalService = inject(ModalService)
  private destroy = inject(DestroyRef)

  public form: FormGroup<WarrantyItemGroup> =
    this.formBuilder.nonNullable.group(
      {
        asset: [null as Asset | null, { validators: [Validators.required] }],
        item: [null as Asset | null, { validators: [Validators.required] }],
        itemQuantity: ['1', { validators: [Validators.required] }],
        serialNumber: '',
        warrantyReason: ['', { validators: [Validators.required] }],
        warrantyInfo: { value: 'Active', disabled: true },
        breakdownDate: ['', { validators: [Validators.required] }],
        attachments: this.formBuilder.array<FormArray>([])
      },
      { updateOn: 'submit' }
    )

  private readonly valueChangeSubscription = this.form.valueChanges
    .pipe(takeUntilDestroyed(this.destroy))
    .subscribe((value) => this.onChange(value))

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe((value) => this.onChange(value))
  }

  public removeWarrantyItem(index: number) {
    this.remove.emit(index)
  }

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(input: AbstractControl | null): boolean {
    if (!input) return false
    return input.invalid && input.touched
  }

  public onSubmit(): void {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.isEdit = false
      this.editEvent.emit({ index: this.index, isEdit: this.isEdit })
    }
  }

  private createAttachmentGroup(): AttachmentFormGroup {
    return this.formBuilder.nonNullable.group({
      description: ['', { validators: [Validators.required] }],
      documentData: [''],
      documentName: [''],
      id: ['']
    })
  }

  public addAttachmentToWarranty(document: DocumentInput): void {
    const formattedDocument: DocumentInputType = { ...document, id: uuidv4() }
    const group = this.createAttachmentGroup()

    Object.keys(group.controls).forEach((key) => {
      group.patchValue({
        [key]: formattedDocument[key as keyof typeof formattedDocument]
      })
    })

    this.attachments.controls.push(group)
    this.attachments.updateValueAndValidity()
    this.closeModal()
  }

  public removeAttachment(id: string) {
    const index = this.attachments.value.findIndex(
      (value: Partial<DocumentInputType>) => value.id === id
    )
    this.attachments.removeAt(index)
  }

  public editItem(event: Event) {
    event.stopPropagation()
    this.isEdit = true
    this.editEvent.emit({ index: this.index, isEdit: this.isEdit })
  }

  /**
   * Close add attachment modal when document was uploaded
   */
  public closeModal(): void {
    this.modalService.close('add-attachment')
  }

  private onChange = (value: any): void => {
    // onChange
  }
  private onTouched = (): void => {
    // onTouched
  }

  public writeValue(value: any): void {
    value && this.form.patchValue(value, { emitEvent: false })
  }

  public registerOnChange(
    fn: (
      value: Partial<{
        asset: Asset | null
        item: Asset | null
        itemQuantity: string
        serialNumber: string
        warrantyReason: string
        warrantyInfo: string
        breakdownDate: string
        attachments: DocumentInputType[]
      }>
    ) => void
  ): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable()
  }

  public get attachments(): FormArray<AttachmentFormGroup> {
    return this.form.controls.attachments as FormArray<AttachmentFormGroup>
  }
}
