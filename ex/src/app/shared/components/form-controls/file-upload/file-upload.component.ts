/**
 * @OPEN What should happen when the user tries to upload the same file more than once?
 * - There might be an already uploaded file with the same name, size and lastModified date
 * - They might have selected the same file twice to upload. Should we send a notification
 *   to the parent component about it?
 * - Should we support adding a dialog to verify if the user really wants to remove the file?
 * - There is no assistive text support for now. Should we add it?
 * @DECISIONS
 * - Every time the user selects a file, it should be added to the list of files to upload.
 *   The parent component will receive a notification through the formcontrol.
 * - When the user removes a file there are two scenarios:
 *   - The file is added from outside. The parent component receives an event and should
 *     perform any necessary actions to clean up.
 *   - The file is added from the file input, so the file will be removed and the parent is notified.
 * - When the user tries to select the same file twice, the second file will be silently dropped.
 * - Disabling the component will disable the file input and the remove the trash icon-button from files.
 * - It allows to add a modal component to fetch additional information about the file from the user.
 *   The modal should return the files extended with the additional information.
 * - Labels are were re-defined to be more generic and reusable.
 * - Files can be added by the view-model too, but cleaning up is up to the parent component.
 */
import { CommonModule } from '@angular/common'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { DialogService } from '@core/dialog/dialog.service'
import { TranslocoModule } from '@ngneat/transloco'
import {
  BehaviorSubject,
  combineLatest,
  map,
  NEVER,
  Observable,
  of,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  switchScan,
  withLatestFrom
} from 'rxjs'
import { File } from './interfaces/file.interface'

//See:
// - https://github.com/Microsoft/TypeScript/issues/26347
// - https://github.com/Microsoft/TypeScript/issues/4881
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FileUploadVM<VM = any, C = any> {
  files: File[]
  labels: {
    ADD_ATTACHMENT: string
    EMPTY_STATE_TITLE: string
    EMPTY_STATE_EXPLANATION: string
    EYEBROW: string
  }
  modalComponent?: C
  modalComponentVM?: VM
  disabled?: boolean
  single?: boolean
}

export interface PartialFileUploadVM {
  files?: File[]
  labels?: Partial<FileUploadVM['labels']>
  modalComponent?: FileUploadVM['modalComponent']
  modalComponentVM?: FileUploadVM['modalComponentVM']
  single?: boolean
}

export const defaultValues: FileUploadVM = {
  files: [],
  labels: {
    // 'Add attachment'
    ADD_ATTACHMENT: 'AttachmentComponent.AddAttachment',
    //'No files added'
    EMPTY_STATE_TITLE: 'AttachmentComponent.EmptyStateTitle',
    // 'Please add your file(s)'
    EMPTY_STATE_EXPLANATION: 'AttachmentComponent.EmptyStateExplanation',
    // 'Add attachmet(s)'
    EYEBROW: 'AttachmentComponent.Eyebrow'
  }
}

export type AddedFileEvent = (File & { remove: () => void })[]

const partialToFull = (partial: PartialFileUploadVM) => {
  return {
    ...partial,
    files: partial.files || [],
    labels: Object.assign({}, defaultValues.labels, partial.labels)
  }
}

const isSameFile = (a: File, b: File) => {
  if (a.fileHandler === undefined || b.fileHandler === undefined) {
    return false
  }
  const {
    name: nameA,
    size: sizeA,
    lastModified: lastModifiedA
  } = a.fileHandler
  const {
    name: nameB,
    size: sizeB,
    lastModified: lastModifiedB
  } = b.fileHandler
  return nameA === nameB && sizeA === sizeB && lastModifiedA === lastModifiedB
}

const uniqueBy = <T>(cb: (a: T, b: T) => boolean, arr: T[]) =>
  arr.reduce<T[]>((acc, itemA) => {
    if (acc.some((itemB) => cb(itemA, itemB))) {
      return acc
    }
    return [...acc, itemA]
  }, [])

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, OnChanges {
  private dialogService = inject(DialogService)
  private viewContainerRef = inject(ViewContainerRef)

  /* Inputs and Outputs */
  @Output()
  public removedFile = new EventEmitter<File>()
  @Output()
  public addedFiles = new EventEmitter<AddedFileEvent>()
  @Input({ transform: booleanAttribute })
  public error!: boolean
  @Input()
  public vm: PartialFileUploadVM = defaultValues
  public vm$ = new BehaviorSubject<FileUploadVM>(partialToFull(this.vm))
  /* Lifecycle */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.vm) {
      this.vm$.next(partialToFull(this.vm))
    }
  }
  /* Observables */
  public inputChange$ = new Subject<HTMLInputElement>()
  private removedFiles$ = this.removedFile.pipe(
    scan<File, File[]>((acc, file) => [...acc, file], []),
    startWith<File[]>([]),
    shareReplay(1)
  )
  private inputFiles$ = this.inputChange$.pipe(
    withLatestFrom(this.vm$),
    switchScan<[HTMLInputElement, FileUploadVM], File[], Observable<File[]>>(
      (acc, [input, vm]) => {
        const files = Array.from(input.files || []).map(
          (file): File => ({
            fileHandler: file,
            name: file.name,
            removable: true
          })
        )
        /** Clear the filelist of the input, we don't need it anymore
         * See: https://stackoverflow.com/questions/3144419/how-do-i-remove-a-file-from-the-filelist
         */
        input.value = ''
        if (!vm.modalComponent || !files.length) {
          return of(uniqueBy<File>(isSameFile, [...files, ...acc]))
        }
        return this.dialogService
          .create<typeof vm.modalComponentVM, File[]>(
            this.viewContainerRef,
            {
              ...vm.modalComponentVM,
              items: files
            },
            vm.modalComponent
          )
          .result$.pipe(
            switchMap((result) => {
              if (result instanceof Array) {
                return of(uniqueBy<File>(isSameFile, [...result, ...acc]))
              }
              return NEVER
            })
          )
      },
      []
    ),
    startWith<File[]>([]),
    shareReplay(1)
  )
  public files$ = combineLatest([
    this.vm$,
    this.inputFiles$,
    this.removedFiles$
  ]).pipe(
    map(([vm, filesFromInput, removedFiles]) =>
      [...vm.files, ...filesFromInput].filter(
        (file) => !removedFiles.includes(file)
      )
    )
  )
  public hasFiles$ = this.files$.pipe(
    map((files) => files.length > 0),
    startWith(false)
  )

  protected addedFilesEffect = this.inputFiles$.subscribe((files) =>
    this.addedFiles.emit(
      files.map<AddedFileEvent[0]>((file) => ({
        ...file,
        remove: () => this.removeFile(file)
      }))
    )
  )

  /* Methods */
  public removeFile = (file: File) => {
    if (file.removable) {
      this.removedFile.emit(file)
    }
  }
  public downloadFile = (file: File) => {
    if (typeof file.url === 'string') {
      window.open(file.url, '_blank')
    }
  }

  /** @TODO Could be a decorator to remove code duplication and reduce risk of mistakes */
  public touched$ = new BehaviorSubject<boolean>(false)
  public onBlur() {
    this.touched$.next(true)
    this.touched$.complete()
  }

  /* ControlValueAccessor */
  public writeValue(value: File[]): void {
    this.vm$.next(
      partialToFull(Object.assign({}, this.vm$.value, { files: value }))
    )
  }
  public registerOnChange(fn: (files: File[]) => void): void {
    this.files$.subscribe(fn)
  }
  public registerOnTouched(fn: () => void): void {
    this.touched$.subscribe(() => fn())
  }
  public setDisabledState(isDisabled: boolean): void {
    this.vm$.next({ ...this.vm$.value, disabled: isDisabled })
  }
}
