import { CommonModule } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { AssetSelectorComponent } from '@shared/components/form-controls/asset-selector/asset-selector.component'
import { Asset } from '@shared/components/form-controls/asset-selector/interfaces/asset.interface'
import { DropdownModule } from '@shared/components/form-controls/dropdown/dropdown.module'
import { FileUploadComponent } from '@shared/components/form-controls/file-upload/file-upload.component'
import { File } from '@shared/components/form-controls/file-upload/interfaces/file.interface'
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  startWith,
  Subject
} from 'rxjs'
import {
  Case,
  Contact,
  EventSources,
  NewCaseFormVM
} from './new-case-form.interface'

const filterByName = <T extends { name: string }>(
  query: string,
  items: T[] = []
) =>
  items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

@Component({
  selector: 'app-new-case-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    FileUploadComponent,
    DropdownModule,
    AssetSelectorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './new-case-form.component.html',
  styleUrls: ['./new-case-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewCaseFormComponent),
      multi: true
    }
  ]
})
export class NewCaseFormComponent implements ControlValueAccessor, OnChanges {
  @Input({ transform: booleanAttribute })
  public disabled!: boolean

  @Input()
  public vm: NewCaseFormVM | null = null
  public vm$ = new BehaviorSubject<NewCaseFormVM | null>(this.vm)
  /* Lifecycle */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.vm) {
      this.vm$.next(this.vm)
    }
  }

  public form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    eventSource: new FormControl<EventSources | null>(null, [
      Validators.required
    ]),
    contact: new FormControl<Contact | null>(null, [Validators.required]),
    asset: new FormControl<Asset | null>(null),
    attachments: new FormControl<File[]>([])
  })

  public value$ = this.form.valueChanges.pipe(
    filter((value): value is Case => this.form.valid)
  )

  public contactsQuery$ = new Subject<string>()
  public filteredContacts$ = combineLatest([
    this.contactsQuery$.pipe(startWith('')),
    this.vm$
  ]).pipe(
    map(([query, vm]) => filterByName(query, vm?.contactSelectorVM.items))
  )

  public eventSourceQuery$ = new Subject<string>()
  public filteredEventSources$ = combineLatest([
    this.eventSourceQuery$.pipe(startWith('')),
    this.vm$
  ]).pipe(
    map(([query, vm]) => filterByName(query, vm?.eventSourceSelectorVM.items))
  )

  /** @TODO Could be a decorator to remove code duplication and reduce risk of mistakes */
  public touched$ = new BehaviorSubject<boolean>(false)
  public onBlur() {
    this.touched$.next(true)
    this.touched$.complete()
  }

  public writeValue(value: Partial<Case>): void {
    this.form.patchValue(value)
  }
  public registerOnChange(fn: (value: Case) => void): void {
    this.value$.subscribe(fn)
  }
  public registerOnTouched(fn: () => void): void {
    this.touched$.subscribe(fn)
  }
  public setDisabledState?(isDisabled: boolean): void {
    /** @TODO Disabled state for the form? */
    this.disabled = isDisabled
  }
}
